import queryStringify from '../../utils/queryStringify.ts'

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const

interface HttpOptions {
  timeout?: number
  headers?: Record<string, string>
  data?: any
  withCredentials?: boolean
}

type HttpRequest = (url: string, options: HttpOptions) => Promise<XMLHttpRequest>

export class HTTPTransport {
  get: HttpRequest = (url, options: HttpOptions = { timeout: 5000 }) => {
    return this.request(
      `${url}${options.data ? queryStringify(options.data) : ''}`,
      { ...options, method: METHODS.GET },
      options.timeout ?? 5000
    )
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
          const errorMessage = `Request failed with status ${xhr.status}, ${JSON.parse(xhr.response)?.reason}`
          reject(new Error(errorMessage))
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
}

export const httpTransport = new HTTPTransport()
