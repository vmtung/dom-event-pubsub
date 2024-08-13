# dom-event-pubsub

JS library for managing DOM events with a single listener per event type, streamlining event handling and improving performance.

## Installation

You can install this package via npm:

```sh
npm install dom-event-pubsub
```

## Usage

First, import the necessary functions from the package:

```js
import {
  windowAddEventListener,
  windowRemoveEventListener,
  EventPubSub,
} from 'dom-event-pubsub'
```

### Using included Window Event Listener functions

To add / remove an already included `window` event listener, use the `windowAddEventListener` / `windowRemoveEventListener` functions:

```js
const handleClick = (event) => {
  console.log('Window clicked!', event)
}

windowAddEventListener('click', handleClick)

// Later, to remove the event listener
windowRemoveEventListener('click', handleClick)
```

### Event Listeners for Other DOM Elements

To add / remove an event listener to an arbitrary DOM element, create a new instance of `EventPubSub` init by the target element, then use the `addEventListener` / `removeEventListener` function:

```js
const button = document.querySelector('button')
const myListener = new EventPubSub(button)

myListener.addEventListener('click', handleButtonClick)

// Later, to remove the event listener
myListener.removeEventListener('click', handleButtonClick)
```

## Note on Performance

By default, this library uses passive event listeners for better performance. Passive event listeners can improve scrolling performance by allowing the browser to perform optimizations knowing that the event listener will not call preventDefault().

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
