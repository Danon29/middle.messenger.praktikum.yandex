export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const

interface HttpOptions {
  timeout?: number
  headers?: Record<string, string>
  data?: string | FormData
  withCredentials?: boolean
}

type HttpRequest = (url: string, options: HttpOptions) => Promise<XMLHttpRequest>

export class HTTPTransport {
  private _websocket: WebSocket | null = null

  get: HttpRequest = (url, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout ?? 5000)
  }

  post: HttpRequest = (url, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout ?? 5000)
  }

  put: HttpRequest = (url, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout ?? 5000)
  }

  delete: HttpRequest = (url, options = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout ?? 5000)
  }

  request = (
    url: string,
    options: HttpOptions & { method: (typeof METHODS)[keyof typeof METHODS] },
    timeout: number,
    withCredentials = true
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.withCredentials = withCredentials

      xhr.onload = function () {
        if (xhr.status >= 400) {
          reject(new Error(`HTTP Error: ${xhr.status}`))
        } else {
          resolve(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }

  webSocketConnect(url: string) {
    this._websocket = new WebSocket(url) as WebSocket

    this._websocket.onopen = () => {
      console.log('Соединение установлено')
    }

    this._websocket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто')
      } else {
        console.log('Обрыв соединения')
      }
    }

    this._websocket.onmessage = (event) => {
      console.log(event.data)
    }

    this._websocket.onerror = (err) => {
      console.log(`Websocket error: ${err}`)
    }
  }

  webSocketSendMessage(data: string | ArrayBuffer | Blob | ArrayBufferView) {
    if (!this._websocket || this._websocket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket соединение не установлено')
    }
    this._websocket.send(data)
  }

  closeWebSocket(code: number, reason: string) {
    if (this._websocket) {
      this._websocket.close(code, reason)
      this._websocket = null
    }
  }
}

export const httpTransport = new HTTPTransport()
