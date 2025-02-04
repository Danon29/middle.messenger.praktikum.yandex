import Block from './block.ts'
import { store, StoreEvents } from './store.ts'
import { Indexed } from '../types'
import isEqual from '../utils/isEqual.ts'

export function connect<T extends typeof Block>(Component: T, selector?: (state: Indexed) => Indexed) {
  return class extends Component {
    constructor(props) {
      let state = store.getState()

      super({ ...props, ...state })

      console.log('again')
      store.on(StoreEvents.Updated, () => {
        const newState = store.getState()
        //@ts-ignore
        this.setProps({ ...newState })

        state = newState
      })
    }
  }
}
