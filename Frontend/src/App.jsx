import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from "./components/componentsLite/Home";
import Navbar from './components/componentsLite/Navbar';
import PrivacyPolicy from './components/componentsLite/PrivacyPolicy';
import TermsofServices from './components/componentsLite/TermsofServices';
import Jobs from './components/componentsLite/Jobs';
import Browse from './components/componentsLite/Browse'
import Profile from './components/componentsLite/Profile';
import Description from './components/componentsLite/Description';
import Companies from './components/admincomponent/Companies';
import CompanyCreate from './components/admincomponent/CompanyCreate';
import CompanySetup from './components/admincomponent/CompanySetup';
import AdminJobs from './components/admincomponent/AdminJobs';
import PostJob from './components/admincomponent/PostJob';
import Applicants from './components/admincomponent/Applicants';
import ProtectedRoute from './components/admincomponent/ProtectedRoute';




const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/description/:id",
    element: <Description />
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />
  },
  {
    path: "/TermsofServices",
    element: <TermsofServices />
  },
  {
    path: "/Jobs",
    element: <Jobs />
  },
  {
    path: "Home",
    element: <Home />
  },
  {
    path: "Browse",
    element: <Browse />
  },

  //admin
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>


  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>

  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute> <CompanySetup /></ProtectedRoute>


  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>


  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>

  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>

  }

])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App
