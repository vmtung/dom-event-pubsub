type EventCallback<T extends Event> = (event: T) => void;

export class EventPubSub {
  private eventListeners: Map<string, EventCallback<any>[]> = new Map();
  private target: EventTarget;

  constructor(target: EventTarget = window) {
    this.target = target;
  }

  addEventListener<T extends Event>(eventName: string, callback: EventCallback<T>) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }

    const listeners = this.eventListeners.get(eventName);
    listeners.push(callback);

    if (listeners.length === 1) {
      this.target.addEventListener(eventName, this.handleEvent);
    }
  }

  removeEventListener(eventName: string, callback: EventCallback<any>) {
    if (!this.eventListeners.has(eventName)) {
      return;
    }

    const listeners = this.eventListeners.get(eventName);
    const index = listeners.findIndex((listener) => listener === callback);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this.target.removeEventListener(eventName, this.handleEvent);
    }
  }

  private handleEvent = (event: Event) => {
    const eventName = event.type;
    const listeners = this.eventListeners.get(eventName);

    if (listeners) {
      listeners.forEach((listener) => listener(event));
    }
  };
}

let windowListener: EventPubSub | null = null;

export function windowAddEventListener<T extends Event>(eventName: string, callback: EventCallback<T>) {
  if (!windowListener) {
    windowListener = new EventPubSub(window);
  }
  windowListener.addEventListener(eventName, callback);
}

export function windowRemoveEventListener(eventName: string, callback: EventCallback<any>) {
  if (windowListener) {
    windowListener.removeEventListener(eventName, callback);
  }
}