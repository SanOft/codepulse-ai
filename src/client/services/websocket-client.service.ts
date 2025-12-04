/** @format */

interface WebSocketMessage {
  type: string
  [key: string]: any
}

type MessageHandler = (message: WebSocketMessage) => void

export class WebSocketClientService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private handlers: Map<string, MessageHandler[]> = new Map()
  private url: string

  constructor(url: string = 'ws://localhost:5000/ws') {
    this.url = url
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return // Already connected
    }

    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0

        // Authenticate if we have a user ID
        const userId = localStorage.getItem('github_user_id')
        if (userId) {
          this.send({
            type: 'authenticate',
            userId,
          })
        }
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.ws = null
        this.attemptReconnect()
      }
    } catch (error) {
      console.error('Error connecting WebSocket:', error)
      this.attemptReconnect()
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * this.reconnectAttempts

    console.log(
      `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    )

    setTimeout(() => {
      this.connect()
    }, delay)
  }

  private handleMessage(message: WebSocketMessage) {
    // Call all handlers for this message type
    const handlers = this.handlers.get(message.type) || []
    handlers.forEach((handler) => handler(message))

    // Also call wildcard handlers
    const wildcardHandlers = this.handlers.get('*') || []
    wildcardHandlers.forEach((handler) => handler(message))
  }

  on(messageType: string, handler: MessageHandler) {
    if (!this.handlers.has(messageType)) {
      this.handlers.set(messageType, [])
    }
    this.handlers.get(messageType)!.push(handler)

    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(messageType)
      if (handlers) {
        const index = handlers.indexOf(handler)
        if (index > -1) {
          handlers.splice(index, 1)
        }
      }
    }
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message)
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.handlers.clear()
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

export const webSocketClient = new WebSocketClientService()
