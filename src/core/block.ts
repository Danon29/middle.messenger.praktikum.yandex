import EventBus from './eventBus'
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'
import FormValidator from '../utils/validator/FormValidator.ts'
import { InputField } from '../components'

type ObjectType = {
  [key: string]: string
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const

  public _element: HTMLElement | null = null
  private _meta: { tagName: string; props: Record<string, any> } | null = null
  public id = nanoid(6)
  protected eventBus: () => EventBus<string>
  public children: Record<string, Block | Block[]>
  public props: Record<string, any>
  protected validator: FormValidator | null = null
  public template: string = ''

  protected selfCheck: boolean

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsWithChildren
   * @param {FormValidator} validator
   * @param {boolean} selfCheck
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren = {}, validator?: FormValidator, selfCheck = false) {
    const eventBus = new EventBus()
    this.eventBus = () => eventBus

    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this.children = children

    this._meta = {
      tagName,
      props
    }
    if (validator) this.validator = validator
    this.selfCheck = selfCheck

    this.props = this._makePropsProxy(props)

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources() {
    if (this._meta) {
      const { tagName, props } = this._meta
      this._element = this._createDocumentElement(tagName)
      if (typeof props.className === 'string') {
        const classes = props.className.split(' ')
        this._element.classList.add(...classes)
      }

      if (typeof props.attrs === 'object') {
        Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
          this._element!.setAttribute(attrName, String(attrValue))
        })
      }
    }
  }

  init() {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  //@ts-ignore
  _getChildrenAndProps(propsAndChildren) {
    const children: Record<string, Block | Block[]> = {}
    //@ts-ignore
    const props: Record<string, any> = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          props[key] = value
        } else {
          value.forEach((obj) => {
            if (obj instanceof Block) {
              children[key] = value
            } else {
              props[key] = value
            }
          })
        }
        return
      }
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  // Не представляю как типизировать пропсы для разных компонентов, включая дочерних
  //@ts-ignore
  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  //@ts-ignore
  componentDidUpdate(oldProps, newProps) {
    return true
  }

  //@ts-ignore
  public setProps = (nextProps) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      const handler = events[eventName]
      if (typeof handler === 'function' && this._element) {
        this._element?.addEventListener(eventName, events[eventName])
      }
    })
  }

  _addAttributes() {
    const { attr = {} } = this.props

    if (this.props.withInternalId) {
      this._element?.setAttribute('data-id', this.id)
    }

    Object.entries(attr as ObjectType).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string)
      }
    })
  }

  _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      const handler = events[eventName]
      if (typeof handler === 'function' && this._element) {
        this._element.removeEventListener(eventName, handler)
      }
    })
  }

  compile(template: string, props: any) {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => {
            return `<div data-id="${component.id}"></div>`
          })
          .join('')
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement
    const compiledTemplate = Handlebars.compile(template)
    fragment.innerHTML = compiledTemplate(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          if ('content' in fragment) {
            const stub = fragment.content.querySelector(`[data-id="${component.id}"]`)
            if (stub) {
              stub.replaceWith(component.getContent() as HTMLElement)
            }
          }
        })
      } else {
        if ('content' in fragment) {
          const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
          if (stub) {
            stub.replaceWith(child.getContent() as HTMLElement)
          }
        }
      }
    })
    return fragment.content
  }

  _render() {
    this._removeEvents()
    const block = this.render()

    if (typeof block !== 'string') {
      if (this._element?.children.length === 0) {
        this._element!.appendChild(block)
      } else {
        this._element!.replaceChildren(block)
      }

      this._addEvents()
      this._addAttributes()
    }
  }

  render(): Node | string {
    return this.compile(this._meta?.tagName ?? '', this.props)
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created')
    }
    return this._element
  }

  //@ts-ignore
  _makePropsProxy(props) {
    const self = this

    return new Proxy(props as any, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        target[prop] = value
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty(target, property) {
        throw new Error(`Нет доступа к полю ${String(property)} у ${target}`)
        return true
      }
    })
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    const content = this.getContent()
    if (content) content.style.display = 'block'
  }

  hide() {
    const content = this.getContent()
    if (content && content.style) content.style.display = 'none'
  }

  protected handleInputChange(event: Event): void {
    const { name, value } = event.target as HTMLInputElement
    this.setProps({
      formState: {
        ...this.props.formState,
        [name]: value
      }
    })

    this.validator?.updateFormState(this.props.formState)

    this.validator?.handleBlur(event)
    this.setProps({ errors: this.validator?.getErrors() })

    const errorMessage = this.validator?.getErrors()[name] || ''

    if (this.selfCheck) this.setProps({ errorMessage })
    else
      ((this.children.Form as Block).children.inputs as InputField[])
        .find((input) => input.props.name === name)
        ?.setProps({ errorMessage })
  }

  protected handleSubmit(event: Event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault()
    }
    this.validator?.updateFormState(this.props.formState)

    const isValid = this.validator?.validateForm()

    const errors = this.validator?.getErrors() as { [p: string]: string }
    this.setProps({ errors })

    if (isValid) {
      console.log(this.props.formState)
      return true
    } else {
      Object.entries(errors).forEach(([key, errorMessage]) => {
        if (this.selfCheck) this.setProps({ errorMessage })
        else
          ((this.children.Form as Block).children.inputs as InputField[])
            .find((input) => input.props.name === key)
            ?.setProps({ errorMessage })
      })
      return false
    }
  }
}
