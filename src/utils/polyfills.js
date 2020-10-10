import 'core-js/features/set'
import 'core-js/features/map'
import 'core-js/features/symbol'
import 'core-js/features/array'
import 'core-js/features/object'

function addCustomEventPolyfill() {
  if (typeof window.CustomEvent === 'function') {
    // If not IE
    return false
  }

  function CustomEvent(
    event,
    params = { bubbles: false, cancelable: false, detail: undefined },
  ) {
    const { bubbles, cancelable, detail } = params
    const customEvent = document.createEvent('CustomEvent')

    customEvent.initCustomEvent(customEvent, bubbles, cancelable, detail)

    return customEvent
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
}

function addArrayFlatPolyfill() {
  const ArrayPrototype = Array.prototype

  if ('flatten' in ArrayPrototype && !('flat' in ArrayPrototype)) {
    ArrayPrototype.flat = ArrayPrototype.flatten
  }
}
addCustomEventPolyfill()
addArrayFlatPolyfill()
