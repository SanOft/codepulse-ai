/** @format */

import express, { Request, Response } from 'express'
import crypto from 'crypto'
import { webSocketService } from '../services/websocket.service.js'

const router = express.Router()

// GitHub webhook secret (should be in .env)
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || ''

// Verify GitHub webhook signature
function verifyGitHubSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) {
    console.warn('GITHUB_WEBHOOK_SECRET not set, skipping signature verification')
    return true // Allow in development
  }

  const hmac = crypto.createHmac('sha256', secret)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

// GitHub webhook endpoint
router.post('/github', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-hub-signature-256'] as string
    const event = req.headers['x-github-event'] as string
    const deliveryId = req.headers['x-github-delivery'] as string

    if (!signature || !event) {
      return res.status(400).json({
        success: false,
        error: 'Missing required headers',
        timestamp: Date.now(),
      })
    }

    const payload = req.body.toString()

    // Verify signature
    if (!verifyGitHubSignature(payload, signature, GITHUB_WEBHOOK_SECRET)) {
      console.error('Invalid GitHub webhook signature')
      return res.status(401).json({
        success: false,
        error: 'Invalid signature',
        timestamp: Date.now(),
      })
    }

    const data = JSON.parse(payload)

    // Handle different GitHub events
    switch (event) {
      case 'pull_request':
        await handlePullRequestEvent(data, deliveryId)
        break

      case 'ping':
        console.log('GitHub webhook ping received')
        return res.status(200).json({
          success: true,
          message: 'Webhook configured successfully',
          timestamp: Date.now(),
        })

      default:
        console.log(`Unhandled GitHub event: ${event}`)
    }

    res.status(200).json({
      success: true,
      message: 'Webhook processed',
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Error processing GitHub webhook:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: Date.now(),
    })
  }
})

async function handlePullRequestEvent(data: any, deliveryId: string) {
  const action = data.action
  const pr = data.pull_request

  if (action === 'opened' || action === 'reopened') {
    // New PR created
    const notification = {
      type: 'github_pr_created',
      id: deliveryId,
      pr: {
        id: pr.id.toString(),
        number: pr.number,
        title: pr.title,
        body: pr.body,
        state: pr.state,
        author: pr.user.login,
        authorAvatar: pr.user.avatar_url,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        repository: {
          owner: data.repository.owner.login,
          name: data.repository.name,
          fullName: data.repository.full_name,
        },
        url: pr.html_url,
        diffUrl: pr.diff_url,
      },
      timestamp: Date.now(),
    }

    // Broadcast to all connected clients
    const sentCount = webSocketService.broadcast(notification)
    console.log(`PR notification sent to ${sentCount} clients: PR #${pr.number} - ${pr.title}`)
  } else if (action === 'closed') {
    // PR closed
    const notification = {
      type: 'github_pr_closed',
      id: deliveryId,
      pr: {
        number: pr.number,
        title: pr.title,
        repository: {
          owner: data.repository.owner.login,
          name: data.repository.name,
          fullName: data.repository.full_name,
        },
        merged: pr.merged,
      },
      timestamp: Date.now(),
    }

    webSocketService.broadcast(notification)
  }
}

export default router

