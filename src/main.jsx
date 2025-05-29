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
import Cover from './pages/Cover.jsx'
import { MusicProvider } from "./MusicProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", index: true, element: <Cover /> },
      { path: "home", element: <Home /> },
      { path: "materi", element: <Materi /> },
      { path: "quiz", element: <Quiz /> },
    ]
  },
  {
    path: "/materi/detail/:id",
    element: (
      <App />
    ),
    children: [
      {
        path: "",
        element: <MusicProvider><ProvinceDetail /></MusicProvider>,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
