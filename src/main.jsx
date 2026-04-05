import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MarksObtained from './context/MarksObtained.jsx'
import set1 from './context/set1.js'
import set2 from './context/set2.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage />
  },
  {
    path:'set1',
    element:<MarksObtained>
      <App set={set1} />
    </MarksObtained>,
  },
  {
    path:'set2',
    element:<MarksObtained>
      <App set={set2} />
    </MarksObtained>,
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
    
  </StrictMode>,
)
