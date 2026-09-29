let listeners = []

export const emitFlash = (flash) => {
  listeners.forEach((listener) => listener(flash))
}

export const subscribeToFlash = (listener) => {
  listeners.push(listener)

  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}