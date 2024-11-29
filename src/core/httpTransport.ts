export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

interface HttpOptions {
  timeout: number
  headers?: Record<string, string>
  method: string
  data?: Record<string, string | number | Object> // если data - это объект с ключами-строками и значениями-строками/числами
}

function queryStringify(data: Record<string, string | number | Object> | null): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}
export class HTTPTransport {
  get = (url: string, options: HttpOptions = { timeout: 5000, method: METHODS.GET }) => {
    return this.request(url, options, options.timeout)
  }

  post = (url: string, options: HttpOptions = { timeout: 5000, method: METHODS.POST }) => {
    return this.request(url, options, options.timeout)
  }

  put = (url: string, options: HttpOptions = { timeout: 5000, method: METHODS.PUT }) => {
    return this.request(url, options, options.timeout)
  }

  delete = (url: string, options: HttpOptions = { timeout: 5000, method: METHODS.DELETE }) => {
    return this.request(url, options, options.timeout)
  }

  request = (url: string, options: HttpOptions, timeout: number): Promise<XMLHttpRequest> => {
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
