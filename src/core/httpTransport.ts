export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const

interface HttpOptions {
  timeout: number
  headers?: Record<string, string>
  data?: Record<string, string | number | object>
}

function queryStringify(data: Record<string, string | number | object> | null): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(String(data[key]))
    return `${result}${encodedKey}=${encodedValue}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}
export class HTTPTransport {
  get = (url: string, options: HttpOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }

  post = (url: string, options: HttpOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }

  put = (url: string, options: HttpOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }

  delete = (url: string, options: HttpOptions = { timeout: 5000 }) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }

  request = (
    url: string,
    options: HttpOptions & { method: (typeof METHODS)[keyof typeof METHODS] },
    timeout: number
  ): Promise<XMLHttpRequest> => {
    debugger
    const { headers = {}, method, data } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
