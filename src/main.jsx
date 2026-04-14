import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify"
import { Provider, useSelector } from "react-redux"
import store from "./redux/store.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import HeritageDetails from "./pages/HeritageDetails.jsx"
import Map from './pages/Map.jsx'
import OpenRoute from './components/core/auth/OpenRoute.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import UpdatePassword from './pages/UpdatePassword.jsx'
// import ProtectedRoute from './components/core/Auth/ProtectedRoute.jsx'
import Dashboard from "./pages/Dashboard.jsx"
// import MyProfile from './components/core/Dashboard/MyProfile.jsx'
// import Setting from './components/core/Dashboard/Settings/Setting.jsx'
// import Cart from './components/core/Dashboard/Cart/Cart.jsx'
// import EnrollCourses from './components/core/Dashboard/EnrollCourses.jsx'
// import StudentRoute from "./components/core/Dashboard/DashboardRouterSecurity/StudentRoute.jsx"
// import Instructor from './components/core/Dashboard/Instructor.jsx'
// import InstructorRoutes from './components/core/Dashboard/DashboardRouterSecurity/InstructorRoutes.jsx'
// import AddCourse from './components/core/Dashboard/AddCourse/AddCourse.jsx'
// import MyCourse from './components/core/Dashboard/MyCourse.jsx'
// import EditCourse from './components/core/Dashboard/EditCourse/EditCourse.jsx'
import ProtectedRoute from './components/core/auth/ProtectordRoute.jsx'
import AdminRoutes from "./components/core/Dashboard/DashboardRoutes/AdminRoutes.jsx"
import UserRoutes from "./components/core/Dashboard/DashboardRoutes/UserRoutes.jsx"
import MyProfile from './components/core/Dashboard/MyProfile.jsx'
import SavedHeritage from './components/core/Dashboard/SavedHeritage/SavedHeritage.jsx'
import AddHeritage from "./components/core/Dashboard/AddHeritage/AddHeritage.jsx"
import Setting from "./components/core/Dashboard/Settings/Setting.jsx"
import AllHeritage from "./components/core/Dashboard/AllHeritage/AllHeritage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/heritage-details/:heritageId",
        element: <HeritageDetails />
      },
      {
        path: "/heritage-map",
        element: <Map />
      },

      // Open route for non loged user 
      {
        path: "/signup",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <SignUp />
          }
        ]
      },
      {
        path: "/login",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <Login />
          }
        ]
      },
      {
        path: "/verify-email",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <VerifyEmail />
          }
        ]
      },
      {
        path: "/forget-password",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <ForgetPassword />
          }
        ]
      },
      {
        path: "/update-password/:id",
        element: <OpenRoute />,
        children: [
          {
            index: true,
            element: <UpdatePassword />
          }
        ]
      },

      // Dashboard routes

      {
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard/my-profile",
            element: <MyProfile/>
          },
          {
            path: "/dashboard/settings",
            element: <Setting />
          },
          {
            path: "/dashboard/saved-heritage",
            element: <UserRoutes><SavedHeritage/></UserRoutes>
          },
          {
            path: "/dashboard/add-heritage",
            element: <AdminRoutes><AddHeritage/></AdminRoutes>
          },
          {
            path: "/dashboard/all-heritage",
            element: <AdminRoutes><AllHeritage/></AdminRoutes>
          },
          {
            path: "/dashboard/edit-heritage/:heritageId",
            element: <AdminRoutes><AddHeritage/></AdminRoutes>
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
