import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Materi from './pages/Materi.jsx'
import Quiz from './pages/Quiz.jsx'
import ProvinceDetail from './pages/ProvinceDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", index: true, element: <Home /> },
      { path: "materi", element: <Materi /> },
      { path: "quiz", element: <Quiz /> },
      { path: "materi/detail/:id", element: <ProvinceDetail /> }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
