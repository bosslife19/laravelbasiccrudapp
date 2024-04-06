import {Navigate, createBrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import NotFound from './pages/NotFound'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'
import Dashboard from './pages/Dashboard'
import UserForm from './pages/UserForm'

const router = createBrowserRouter([
    {
        path: '/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to = '/users' />
            },
            {
                path:'/users', 
                element:<User/>
            },
            {
                path:'/users/new',
                element:<UserForm key='userCreate'/>
            },
            {
                path:"/users/:id",
                element:<UserForm key='userUpdate'/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },

        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
         
        ]
    },
    
    {
        path:'*',
        element: <NotFound/>
    }
])

export default router