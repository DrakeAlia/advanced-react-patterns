// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

// 📜 https://reactjs.org/docs/react-api.html#reactchildren
// 📜 https://reactjs.org/docs/react-api.html#cloneelement

// Some of those props are provided to us by the user of our component. 
// Others of these props are provided implicitly. 
// Thanks to the toggle component we're going to be rendered inside of.
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // This toggle component hands those props to us by taking all of its children and mapping those to new children, 
  // which are cloned copies of that original child with these additional props passed implicitly. 
  // At least, it's implicit from the perspective of the users, 
  // and it's explicit from the perspective of this toggle component.
  return React.Children.map(children, child => {
    if (typeof child.type === 'string') {
      return child
    }
    const newChild = React.cloneElement(child, {
      on,
      toggle,
    })
    // console.log(newChild)
    return newChild
  })
}

// Accepts `on` and `children` props and returns `children` if `on` is true (X)
const ToggleOn = ({on, children}) => (on ? children : null)

// Accepts `on` and `children` props and returns `children` if `on` is false (X)
const ToggleOff = ({on, children}) => (on ? null : children)

// Accepts `on` and `toggle` props and returns the <Switch /> with those props. (X)
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
