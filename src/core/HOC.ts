import Block from './block.ts'
import { store, StoreEvents } from './store.ts'
import { Indexed } from '../types'
import isEqual from '../utils/isEqual.ts'

export function connect<P>(
  Component: typeof Block,
  selector: (state: Indexed) => Indexed = (state) => state // По умолчанию отдаёт весь state
) {
  return class extends Component {
    private currentState: Indexed

    constructor(props: P) {
      let fullState = store.getState()
      let selectedState = selector(fullState)

      super({ ...props, ...selectedState } as P)

      this.currentState = selectedState

      store.on(StoreEvents.Updated, () => {
        const newFullState = store.getState()
        const newSelectedState = selector(newFullState)

        if (!isEqual(this.currentState, newSelectedState)) {
          ;(this as Block).setProps({ ...newSelectedState })
          this.currentState = newSelectedState
        }
      })
    }
  }
}
