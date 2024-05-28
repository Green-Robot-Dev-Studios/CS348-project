import { createLazyFileRoute } from '@tanstack/react-router'
import reactLogo from '../assets/react.svg'
import './App.css'


export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Waterfood</h1>
      <p className="read-the-docs">Choose your restaurant</p>
    </>
  )
}
