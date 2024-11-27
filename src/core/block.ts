import EventBus from './eventBus'
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'
import FormValidator from '../utils/validator/FormValidator.ts'
import snakeToCamel from '../utils/snakeCaseToCamel.ts'

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  private _element = null
  private _meta = null
  private _id = nanoid(6)
  protected eventBus: () => EventBus<string>
  protected children: Record<string, Block | Block[]>
  protected props: any
  protected validator: FormValidator

  protected selfCheck: boolean

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsWithChildren
   * @param {FormValidator} validator
   * @param {boolean} selfCheck
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren = {}, validator?, selfCheck = false) {
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

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources() {
    const { tagName, props } = this._meta
    this._element = this._createDocumentElement(tagName)
    if (typeof props.className === 'string') {
      const classes = props.className.split(' ')
      this._element.classList.add(...classes)
    }

    if (typeof props.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element.setAttribute(attrName, attrValue)
      })
    }
  }

  init() {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  _getChildrenAndProps(propsAndChildren) {
    const children = {}
    const props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value
          } else {
            props[key] = value
          }
        })

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

  componentDidMount(oldProps?) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps, newProps) {
    return true
  }

  setProps = (nextProps) => {
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
      this._element.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName])
    })
  }

  _compile() {
    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`)
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    })

    const fragment = this._createDocumentElement('template')
    const template = Handlebars.compile(this.render())
    fragment.innerHTML = template(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          if ('content' in fragment) {
            const stub = fragment.content.querySelector(`[data-id="${component._id}"]`)
            stub?.replaceWith(component.getContent())
          }
        })
      } else {
        if ('content' in fragment) {
          const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
          stub?.replaceWith(child.getContent())
        }
      }
    })

    return 'content' in fragment ? fragment.content : ''
  }

  _render() {
    this._removeEvents()
    const block = this._compile()

    if (this._element.children.length === 0) {
      this._element.appendChild(block)
    } else {
      this._element.replaceChildren(block)
    }

    this._addEvents()
  }

  render() {
    return ''
  }

  getContent() {
    return this.element
  }

  _makePropsProxy(props) {
    const eventBus = this.eventBus()
    const emitBind = eventBus.emit.bind(eventBus)

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
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty(target, property) {
        throw new Error('Нет доступа')
        return true
      }
    })
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }

  protected handleInputChange(event: Event): void {
    const { name, value } = event.target as HTMLInputElement
    this.setProps({
      formState: {
        ...this.props.formState,
        [name]: value
      }
    })

    this.validator.updateFormState(this.props.formState)

    this.validator.handleBlur(event)
    this.setProps({ errors: this.validator.getErrors() })

    const errorMessage = this.validator.getErrors()[name] || ''

    if (this.selfCheck) this.setProps({ errorMessage })
    else
      this.children[`Input${snakeToCamel(name.charAt(0).toUpperCase() + name.slice(1))}`].setProps({
        errorMessage
      })
  }

  protected handleSubmit(event: Event): void {
    event.preventDefault()
    this.validator.updateFormState(this.props.formState)

    const isValid = this.validator.validateForm()

    const errors = this.validator.getErrors()
    this.setProps({ errors })

    if (isValid) {
      console.log(this.props.formState)
    } else {
      Object.entries(errors).forEach(([key, errorMessage]) => {
        if (this.selfCheck) this.setProps({ errorMessage })
        else
          this.children[`Input${snakeToCamel(key.charAt(0).toUpperCase() + key.slice(1))}`].setProps({
            errorMessage
          })
      })
    }
  }
}
