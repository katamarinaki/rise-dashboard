import { createStoreon, StoreonModule } from 'storeon'
import * as hooks from 'storeon/react'

type State = {}

type Events = {}

// Initial state, reducers and business logic are packed in independent modules
const baseStore: StoreonModule<State, Events> = (store) => {
  // Initial state
  store.on('@init', () => {
    return {}
  })
}

/// type binded hook
/// use it instead of importing from storeon
export const useStoreon = (...keys: (keyof State)[]) =>
  hooks.useStoreon<State, Events>(...keys)

export const store = createStoreon([baseStore])
