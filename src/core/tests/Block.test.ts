import Block from '../block.ts'
import { describe } from 'mocha'
import { assert, expect } from 'chai'
import { SinonStub, stub } from 'sinon'

class Dummy extends Block {
  constructor(props: { prop: number }) {
    super('button', { ...props })
  }

  render(): Node | string {
    return this.compile('Test text', {})
  }
}

describe('Block', () => {
  it('Must return correct tag name', () => {
    const block = new Dummy({ prop: 1 })
    assert.equal(block.element!.tagName, 'BUTTON')
  })

  it('Must return correct content', () => {
    const block = new Dummy({ prop: 1 })
    assert.equal(block.element!.textContent, 'Test text')
  })

  it('Must change its props', () => {
    const block = new Dummy({ prop: 1 })
    block.setProps({ ...block.props, newProp: 'newProp' })
    assert.deepEqual(block.props, { prop: 1, newProp: 'newProp' })
  })

  it('Must handle events', () => {
    const block = new Dummy({ prop: 1 })
    const testHandleEvent: SinonStub = stub()
    const testEvent = new MouseEvent('click')

    block.setProps({
      events: {
        click: testHandleEvent
      }
    })

    block.element!.dispatchEvent(testEvent)

    expect(testHandleEvent.calledOnce).to.equal(true)
  })
})
