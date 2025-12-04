/** @format */

import { WebSocketServer, WebSocket } from 'ws'
import { Server } from 'http'

interface ClientConnection {
  ws: WebSocket
  userId?: string
  connectedAt: number
}

export class WebSocketService {
  private wss: WebSocketServer | null = null
  private clients: Set<ClientConnection> = new Set()

  initialize(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' })

    this.wss.on('connection', (ws: WebSocket, _req) => {
      const client: ClientConnection = {
        ws,
        connectedAt: Date.now(),
      }

      this.clients.add(client)

      // Send welcome message
      ws.send(
        JSON.stringify({
          type: 'connected',
          message: 'WebSocket connection established',
          timestamp: Date.now(),
        })
      )

      // Handle incoming messages
      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString())
          this.handleMessage(client, data)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      })

      // Handle disconnect
      ws.on('close', () => {
        this.clients.delete(client)
        console.log('Client disconnected. Total clients:', this.clients.size)
      })

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
        this.clients.delete(client)
      })

      console.log(
        'New WebSocket client connected. Total clients:',
        this.clients.size
      )
    })

    console.log('WebSocket server initialized on /ws')
  }

  private handleMessage(client: ClientConnection, data: any) {
    switch (data.type) {
      case 'authenticate':
        // In a real app, verify the token here
        client.userId = data.userId
        this.sendToClient(client, {
          type: 'authenticated',
          message: 'Authentication successful',
          timestamp: Date.now(),
        })
        break

      case 'ping':
        this.sendToClient(client, {
          type: 'pong',
          timestamp: Date.now(),
        })
        break

      default:
        console.log('Unknown message type:', data.type)
    }
  }

  private sendToClient(client: ClientConnection, message: any) {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message))
    }
  }

  broadcast(message: any, filter?: (client: ClientConnection) => boolean) {
    const data = JSON.stringify(message)
    let sentCount = 0

    this.clients.forEach((client) => {
      if (filter && !filter(client)) {
        return
      }

      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(data)
        sentCount++
      }
    })

    return sentCount
  }

  sendToUser(userId: string, message: any) {
    return this.broadcast(message, (client) => client.userId === userId)
  }

  getConnectedClientsCount(): number {
    return this.clients.size
  }

  close() {
    if (this.wss) {
      this.wss.close()
      this.clients.clear()
    }
  }
}

export const webSocketService = new WebSocketService()
