import Block from './block.ts'
function isEqual(lhs: string, rhs: string) {
  return lhs === rhs
}

// function render(query: string, block: Block | null) {
//   const root = document.getElementById(query)
//   if (block) root.append(block.getContent())
//   return root
// }

class Route {
  private _pathname: string
  private _blockClass: typeof Block
  private _block: null | Block
  private _props: Record<string, unknown>
  constructor(pathname: string, view: typeof Block, props: Record<string, unknown>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  // navigate(pathname: string) {
  //   if (this.match(pathname)) {
  //     this._pathname = pathname
  //     this.render()
  //   }
  // }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  getParams(pathname: string): Record<string, string> | null {
    const paramNames = [...this._pathname.matchAll(/:([a-zA-Z]+)/g)].map((match) => match[1])
    const routePattern = this._pathname.replace(/:([a-zA-Z]+)/g, '([^/]+)')
    const regExp = new RegExp(`^${routePattern}$`)
    const matches = pathname.match(regExp)

    if (!matches) {
      return null
    }

    return paramNames.reduce<Record<string, string>>((params, paramName, index) => {
      params[paramName] = matches[index + 1]
      return params
    }, {})
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  private _renderDom(query: string, block: Block) {
    const root = document.querySelector(query)
    if (root) {
      root.innerHTML = ''
      root.append(block.getContent()!)
    }
  }

  render() {
    const params = this.getParams(window.location.pathname)

    if (!this._block || params) {
      //@ts-ignore
      this._block = new this._blockClass({ ...params })
      this._renderDom(this._props.rootQuery as string, this._block)
      return
    }
    this._block.show()
  }
}

export default class Router {
  private static __instance: Router
  private history!: History
  private routes: Route[] = []
  private readonly _rootQuery: string = ''
  private _currentRoute: null | Route = null
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }).bind(this)

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname)
    if (!route) {
      if (this._currentRoute) this._currentRoute.leave()
      route = this.getRoute('/client-error')
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    if (route) {
      this._currentRoute = route
      route.render()
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export const router = new Router('#app')
