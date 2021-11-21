import { getMouseOverVector } from './computations'

export type Reference<T extends HTMLElement = HTMLElement> = Window | T

type EventObject<T extends HTMLElement = HTMLElement> = {
  element: Reference<T>,
  type: string,
  function: (ev: any) => void
}

export type PositionVector = {
  x: number,
  y: number
}

type MouserOptions = {
  restState?: {x: number, y: number},
  refreshRate?: number,
  reference?: Reference,
  listeners?: ((v: PositionVector) => void)[]
}

class Mouser {
  private static _instance: Mouser

  private listeners: any[]

  private reference: Reference
  private refreshRate: number
  private eventListeners: EventObject[] = []
  private restState: PositionVector

  private vector: PositionVector

  private constructor ({
    reference = window,
    restState = {
      x: 0,
      y: 0
    },
    refreshRate = 0,
    listeners = []
  }: MouserOptions = {}) {
    this.reference = reference
    this.restState = restState
    this.refreshRate = refreshRate
    this.vector = this.restState
    this.listeners = listeners

    this.registerEvents()
  }

  // SINGLETON
  public static Instance (params: MouserOptions) {
    if (!params) {
      return this._instance || (this._instance = new this())
    }
    return new this(params)
  }

  // PUBLIC METHODS
  public addReference (el: Reference) {
    this.reference = el
  }

  public removeReference () {
    this.reference = window
  }

  public addListener (listener: (v: PositionVector) => void) {
    this.listeners.push(listener)
  }

  public removeEventListeners () {
    this.clearEvents(this.eventListeners)
  }

  private dispatchEvents (v: PositionVector) {
    return this.listeners.forEach(listener => {
      listener(v)
    })
  }

  private setEventList () {
    this.eventListeners = [
      {
        element: this.reference || window,
        type: 'mouseleave',
        function: this.setRestState.bind(this)
      },
      {
        element: this.reference || window,
        type: 'mousemove',
        function: this.updateVector.bind(this)
      }
    ]
  }

  private registerEvents () {
    this.setEventList()
    this.eventListeners.forEach(this.addEvent)
  }

  private updateVector (ev: MouseEvent) {
    if (this.shouldUpdate()) {
      // console.log(getMouseOverVector(ev))
      this.vector = getMouseOverVector(ev)
      this.dispatchEvents(this.vector)
    }
  }

  private setRestState () {
    this.vector = this.restState
    this.dispatchEvents(this.vector)
  }

  private addEvent (event: EventObject) {
    event.element?.addEventListener(event.type, event.function)
  }

  private clearEvents (eventListeners: EventObject[]) {
    eventListeners.forEach((event) => {
      event.element?.removeEventListener(event.type, event.function)
    })
  }

  // determine element update based on given rate
  private shouldUpdate (): boolean {
    let counter = 0
    if (this.refreshRate === 0) return true
    return counter++ % this.refreshRate === 0
  }
}

// export singleton
export default function getMouserInstance (params:MouserOptions): Mouser {
  return Mouser.Instance(params)
}
