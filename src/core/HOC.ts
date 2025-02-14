import Block from './block.ts'
import { store, StoreEvents } from './store.ts'
import { Indexed } from '../types'
import isEqual from '../utils/isEqual.ts'
import { deepClone } from '../utils/cloneDeep.ts'

export function connect<P>(
  Component: typeof Block,
  selector: (state: Indexed) => Indexed = (state) => state // По умолчанию отдаёт весь state
) {
  return class extends Component {
    private currentState: Indexed

    constructor(props: P) {
      let fullState = store.getState()
      let selectedState = selector(fullState)

      //@ts-ignore
      super({ ...props, ...selectedState })

      this.currentState = deepClone(selectedState)

      store.on(StoreEvents.Updated, () => {
        const newState = selector(store.getState())
        if (!isEqual(this.currentState, newState)) {
          ;(this as Block).setProps({ ...newState })
        }

        this.currentState = newState
      })
    }
  }
}
