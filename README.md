# Mouser &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/luisorbaiceta/mouser/LICENSE) [![npm version](https://img.shields.io/npm/v/mouser.js.svg?style=flat)](https://www.npmjs.com/package/mouser.js) ![CI](https://github.com/luisorbaiceta/mouser/actions/workflows/ci.yml/badge.svg?branch=main) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/luisorbaiceta/mouser/pulls)

Mouser is a Javascript helper for mouse move animations. Import the function, pass a list of listeners, and they will
recieve a vector with the current mouse position ranging from 0 to 1. `{x: 0.23, y: 0.7}`

* **Zero-Dependencies:** With a size of ~5kb.
* **Minimal:** Mouser.js just registers the listeners and pass the vector to them. What you do with those values is
totally up to you.
* **Use Anywhere:** Mouser.js doesn't make assumptions about your technology stack, so you can use mouser.js wherever  you want.

## **Installation**
Mouser.js has been designed for minimal and efficient usage. To avoid memory leaking and ensure efficiency, Mouser.js works as a singleton. It will only return a new object, only if the params field is used, otherwise it will return the same instance. **Users are in charge of clearing the events** with the `removeEventListeners` method. *(See example below).*

You can use Mouser.js as a `<script>` tag from a [CDN]() (*TO-DO*), or as a `mouser.js` package on [npm](https://www.npmjs.com/package/mouser.js):

```
npm install --save mouser.js
```

```js
import mouser from 'mouser.js'

// your code
```

## **Examples**

Here is the first example to get you started:

```js
import mouser from 'mouser.js'

const domElement = document.querySelector('#id')

mouser({
  reference: domElement, // optional, defaults to window
  listeners: [console.log]
})
```

This example will print the vector `{x: number, y: number}` to the console whenever the effect is triggered. You'll notice that we used a simple `console.log` method, but you can pass to the listener any synchronous function...

### Using it with [React](https://reactjs.org/)

```jsx
import React, { useState } from 'react';
import mouser from 'mouser.js';

function Example() {
  const [v, setV] = useState({x: 0, y: 0}); // you can pass any rest state

  useEffect(() => {
    mouser({
      listeners: [setV]
    })
  }, [setV]);

  return (
    <div>
      <p>x: {v.x} - y: {v.y}</p>
    </div>
  );
}
```

## **API**

### **Params**
Optional object the you can pass when calling the mouser.js function

```ts
import mouser from 'mouser.js';

const helper = mouser({
    // element from which the range values will be applied
    reference: Document | Window | HTMLElement // defaults to window

    // array of functions that accepts the x,y vector
    listeners: ((v: {x: number, y: number}) => void)[] // defaults to []

    // rate to apply the update of the returned vector
    refreshRate: number // defaults to 0

    // value that will be returned ONCE when mouse is out the reference
    restState: { x: number, y: number }
})
```
### **Methods**

```ts
import mouser from 'mouser.js';

const helper = mouser();

// replaces the current reference
helper.addReference(el: Document | Window | HTMLElement);

// sets the reference to the default (window)
helper.removeReference();

// adds a listener to the current array of listeners
helper.addListener(listener: (v: {x: number, y: number}) => void);

// IMPORTANT clears all event listeners to avoid memory leaks
helper.removeEventListeners();
```
## **Showcase**

Send a PR to appear in this section.

## **Contributing**

The main purpose of this repository is to continue evolving Mouser.js, making it faster and easier to use. Development of Mouser.js happens in the open on GitHub, and I am are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Mouser.js.

### Contributing Guide

Just send a PR or report an issue and I will be happy to review.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/luisorbaiceta/mouser/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started.

### License

Mouser.js is [MIT licensed](./LICENSE).

![Stadistics](https://repobeats.axiom.co/api/embed/af3b64bcf77d1cd1bac9a8b2856d6b0e1f55e9c9.svg "Repobeats analytics image")

## **Note**

This project has been heavily inspired by the [Webflow](https://webflow.com/) approach to mouse move animations.
