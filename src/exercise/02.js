// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

// 📜 https://reactjs.org/docs/react-api.html#reactchildren
// 📜 https://reactjs.org/docs/react-api.html#cloneelement

// we just trusted in faith that we would get the props that we needed for each one of these components.
// Some of those props are provided to us by the user of our component.
// Others of these props are provided implicitly.
// Thanks to the toggle component we're going to be rendered inside of.
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

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

const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
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
