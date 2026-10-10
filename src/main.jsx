import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from './components/Error.jsx'
import Home from './components/Home.jsx'  
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Services from './components/Services.jsx'
import Product from './components/Product.jsx'
import Login from './components/Login.jsx'
import ResetPassword from './components/Resetpassword.jsx'
const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "/product/:id" , element: <Product/>},
      { path: "login", element: <Login /> },
       { path: "reset-password/:token", element: <ResetPassword /> },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
