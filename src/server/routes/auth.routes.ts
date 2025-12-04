/** @format */

import { Router, Request, Response } from 'express'
import axios from 'axios'
import { ApiResponse } from '../types/index.js'

const router = Router()

// GitHub OAuth
router.get('/auth/github', (_req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID
  const redirectUri =
    process.env.GITHUB_REDIRECT_URI ||
    'http://localhost:5000/auth/github/callback'
  const scope = 'repo,user,read:org'

  if (!clientId) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'GitHub Client ID is not configured',
      timestamp: Date.now(),
    }
    return res.status(500).json(response)
  }

  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}`
  res.redirect(redirectUrl)
})

router.get('/auth/github/callback', async (req: Request, res: Response) => {
  try {
    const { code, error } = req.query
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const clientId = process.env.GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET
    const redirectUri =
      process.env.GITHUB_REDIRECT_URI ||
      'http://localhost:5000/auth/github/callback'

    if (error) {
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'github',
                  error: '${String(error).replace(/'/g, "\\'")}'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/github?error=${encodeURIComponent(
        error as string
      )}';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    if (!code) {
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'github',
                  error: 'no_code'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/github?error=no_code';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    if (!clientId || !clientSecret) {
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'github',
                  error: 'config_missing'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/github?error=config_missing';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      },
      {
        headers: { Accept: 'application/json' },
      }
    )

    const { access_token, error: tokenError } = tokenResponse.data

    if (tokenError || !access_token) {
      const errorMsg = tokenError || 'token_failed'
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'github',
                  error: '${errorMsg.replace(/'/g, "\\'")}'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/github?error=${encodeURIComponent(
        errorMsg
      )}';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const user = userResponse.data

    // Return HTML page that closes popup and sends message to parent
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Success</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_SUCCESS',
                provider: 'github',
                token: '${access_token.replace(/'/g, "\\'")}',
                username: '${user.login.replace(/'/g, "\\'")}',
                userId: '${user.id.toString().replace(/'/g, "\\'")}'
              }, '${frontendUrl}');
              window.close();
            } else {
              const params = new URLSearchParams({
                token: '${access_token.replace(/'/g, "\\'")}',
                provider: 'github',
                username: '${user.login.replace(/'/g, "\\'")}',
                userId: '${user.id.toString().replace(/'/g, "\\'")}'
              });
              window.location.href = '${frontendUrl}/integrations/github/callback?' + params.toString();
            }
          </script>
          <p>Authorization successful! This window will close automatically.</p>
        </body>
      </html>
    `)
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    res.redirect(`${frontendUrl}/integrations/github?error=oauth_failed`)
  }
})

// GitLab OAuth
router.get('/auth/gitlab', (_req: Request, res: Response) => {
  const clientId = process.env.GITLAB_CLIENT_ID
  const redirectUri =
    process.env.GITLAB_REDIRECT_URI ||
    'http://localhost:5000/auth/gitlab/callback'
  const gitlabUrl = process.env.GITLAB_URL || 'https://gitlab.com'
  const scope = 'api read_repository read_user'

  if (!clientId) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'GitLab Client ID is not configured',
      timestamp: Date.now(),
    }
    return res.status(500).json(response)
  }

  const redirectUrl = `${gitlabUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}`
  res.redirect(redirectUrl)
})

router.get('/auth/gitlab/callback', async (req: Request, res: Response) => {
  try {
    const { code, error } = req.query
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const clientId = process.env.GITLAB_CLIENT_ID
    const clientSecret = process.env.GITLAB_CLIENT_SECRET
    const redirectUri =
      process.env.GITLAB_REDIRECT_URI ||
      'http://localhost:5000/auth/gitlab/callback'
    const gitlabUrl = process.env.GITLAB_URL || 'https://gitlab.com'

    if (error) {
      return res.redirect(
        `${frontendUrl}/integrations/gitlab?error=${encodeURIComponent(
          error as string
        )}`
      )
    }

    if (!code) {
      return res.redirect(`${frontendUrl}/integrations/gitlab?error=no_code`)
    }

    if (!clientId || !clientSecret) {
      return res.redirect(
        `${frontendUrl}/integrations/gitlab?error=config_missing`
      )
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(`${gitlabUrl}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    })

    const { access_token, error: tokenError } = tokenResponse.data

    if (tokenError || !access_token) {
      const errorMsg = tokenError || 'token_failed'
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'gitlab',
                  error: '${errorMsg.replace(/'/g, "\\'")}'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/gitlab?error=${encodeURIComponent(
        errorMsg
      )}';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    // Get user info from GitLab
    const userResponse = await axios.get(`${gitlabUrl}/api/v4/user`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const user = userResponse.data

    // Return HTML page that closes popup and sends message to parent
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Success</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_SUCCESS',
                provider: 'gitlab',
                token: '${access_token.replace(/'/g, "\\'")}',
                username: '${user.username.replace(/'/g, "\\'")}',
                userId: '${user.id.toString().replace(/'/g, "\\'")}'
              }, '${frontendUrl}');
              window.close();
            } else {
              const params = new URLSearchParams({
                token: '${access_token.replace(/'/g, "\\'")}',
                provider: 'gitlab',
                username: '${user.username.replace(/'/g, "\\'")}',
                userId: '${user.id.toString().replace(/'/g, "\\'")}'
              });
              window.location.href = '${frontendUrl}/integrations/gitlab/callback?' + params.toString();
            }
          </script>
          <p>Authorization successful! This window will close automatically.</p>
        </body>
      </html>
    `)
  } catch (error) {
    console.error('GitLab OAuth error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    res.redirect(`${frontendUrl}/integrations/gitlab?error=oauth_failed`)
  }
})

// Bitbucket OAuth
router.get('/auth/bitbucket', (_req: Request, res: Response) => {
  const clientId = process.env.BITBUCKET_CLIENT_ID
  const redirectUri =
    process.env.BITBUCKET_REDIRECT_URI ||
    'http://localhost:5000/auth/bitbucket/callback'
  const scope = 'repository:read account:read'

  if (!clientId) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Bitbucket Client ID is not configured',
      timestamp: Date.now(),
    }
    return res.status(500).json(response)
  }

  const redirectUrl = `https://bitbucket.org/site/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}`
  res.redirect(redirectUrl)
})

router.get('/auth/bitbucket/callback', async (req: Request, res: Response) => {
  try {
    const { code, error } = req.query
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const clientId = process.env.BITBUCKET_CLIENT_ID
    const clientSecret = process.env.BITBUCKET_CLIENT_SECRET
    const redirectUri =
      process.env.BITBUCKET_REDIRECT_URI ||
      'http://localhost:5000/auth/bitbucket/callback'

    if (error) {
      return res.redirect(
        `${frontendUrl}/integrations/bitbucket?error=${encodeURIComponent(
          error as string
        )}`
      )
    }

    if (!code) {
      return res.redirect(`${frontendUrl}/integrations/bitbucket?error=no_code`)
    }

    if (!clientId || !clientSecret) {
      return res.redirect(
        `${frontendUrl}/integrations/bitbucket?error=config_missing`
      )
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://bitbucket.org/site/oauth2/access_token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString('base64')}`,
        },
      }
    )

    const { access_token, error: tokenError } = tokenResponse.data

    if (tokenError || !access_token) {
      const errorMsg = tokenError || 'token_failed'
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Error</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'OAUTH_ERROR',
                  provider: 'bitbucket',
                  error: '${errorMsg.replace(/'/g, "\\'")}'
                }, '${frontendUrl}');
                window.close();
              } else {
                window.location.href = '${frontendUrl}/integrations/bitbucket?error=${encodeURIComponent(
        errorMsg
      )}';
              }
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>
      `)
    }

    // Get user info from Bitbucket
    const userResponse = await axios.get('https://api.bitbucket.org/2.0/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const user = userResponse.data

    // Return HTML page that closes popup and sends message to parent
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Success</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_SUCCESS',
                provider: 'bitbucket',
                token: '${access_token.replace(/'/g, "\\'")}',
                username: '${user.username.replace(/'/g, "\\'")}',
                userId: '${user.uuid.replace(/'/g, "\\'")}'
              }, '${frontendUrl}');
              window.close();
            } else {
              const params = new URLSearchParams({
                token: '${access_token.replace(/'/g, "\\'")}',
                provider: 'bitbucket',
                username: '${user.username.replace(/'/g, "\\'")}',
                userId: '${user.uuid.replace(/'/g, "\\'")}'
              });
              window.location.href = '${frontendUrl}/integrations/bitbucket/callback?' + params.toString();
            }
          </script>
          <p>Authorization successful! This window will close automatically.</p>
        </body>
      </html>
    `)
  } catch (error) {
    console.error('Bitbucket OAuth error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    res.redirect(`${frontendUrl}/integrations/bitbucket?error=oauth_failed`)
  }
})

// Get repositories endpoint (requires authentication)
router.get(
  '/auth/:provider/repositories',
  async (req: Request, res: Response) => {
    try {
      const { provider } = req.params
      const token = req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        const response: ApiResponse<never> = {
          success: false,
          error: 'Authorization token required',
          timestamp: Date.now(),
        }
        return res.status(401).json(response)
      }

      let repositories: any[] = []

      switch (provider) {
        case 'github': {
          const response = await axios.get(
            'https://api.github.com/user/repos?per_page=100&sort=updated',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          repositories = response.data.map((repo: any) => ({
            id: repo.id.toString(),
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            private: repo.private,
            defaultBranch: repo.default_branch,
            language: repo.language,
            stars: repo.stargazers_count,
            updatedAt: repo.updated_at,
          }))
          break
        }
        case 'gitlab': {
          const gitlabUrl = process.env.GITLAB_URL || 'https://gitlab.com'
          const response = await axios.get(
            `${gitlabUrl}/api/v4/projects?membership=true&per_page=100&order_by=updated_at`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          repositories = response.data.map((repo: any) => ({
            id: repo.id.toString(),
            name: repo.name,
            fullName: repo.path_with_namespace,
            description: repo.description,
            private: repo.visibility === 'private',
            defaultBranch: repo.default_branch,
            language: null, // GitLab API doesn't provide language in this endpoint
            stars: repo.star_count || 0,
            updatedAt: repo.last_activity_at,
          }))
          break
        }
        case 'bitbucket': {
          const response = await axios.get(
            'https://api.bitbucket.org/2.0/repositories?role=member&pagelen=100',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          repositories = response.data.values.map((repo: any) => ({
            id: repo.uuid,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            private: repo.is_private,
            defaultBranch: repo.mainbranch?.name || 'master',
            language: null, // Bitbucket API doesn't provide language easily
            stars: 0, // Bitbucket doesn't have stars
            updatedAt: repo.updated_on,
          }))
          break
        }
        default: {
          const response: ApiResponse<never> = {
            success: false,
            error: 'Invalid provider',
            timestamp: Date.now(),
          }
          return res.status(400).json(response)
        }
      }

      const apiResponse: ApiResponse<any[]> = {
        success: true,
        data: repositories,
        timestamp: Date.now(),
      }

      res.json(apiResponse)
    } catch (error) {
      console.error('Error fetching repositories:', error)
      const response: ApiResponse<never> = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch repositories',
        timestamp: Date.now(),
      }
      res.status(500).json(response)
    }
  }
)

export default router
