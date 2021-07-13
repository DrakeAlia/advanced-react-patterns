// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext

// we created a toggleContext,
const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

// what we did here was instead of returning a React.Children.map of all the children and forwarding along the props 
// by making clones of those children
// and then we render the provider with the value of those things that we wanted to provide to those children.
  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  return React.useContext(ToggleContext)
}
// In each of the children, we consumed that context here so we can have access to that implicit state.
function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// A common question that I get here is, should I use the children.map function ability, 
// or should I use the context functionality? What I say is you can absolutely use the context version all the time, 
// but using the children.map functionality might be useful if you only care about direct descendants.
// They're use cases for both of these methods.


export default App

/*
eslint
  no-unused-vars: "off",
*/
