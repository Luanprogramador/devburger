import { createBrowserRouter } from "react-router-dom"
import {Login} from '../containers/Login'
import { Register } from "../containers/Register";
import { Home } from "../containers/Home";
import { Menu } from "../containers/Menu";
import { Header } from "../components/Header";
//import { Footer } from "../components/footer";
import {Cart} from "../containers/Cart";
import { Checkout, CompletePayment } from "../containers";
import { Footer } from "../components";

export const router = createBrowserRouter ([
    {
        
        path:'/',
        element :(
            <>
            <Header/>
            <Home/>
            <Footer/>
            </>
        ),
    },
    
   
    {
        
        path:'/login',
        element :<Login/>,
    },
    {
        
        path:'/cadastro',
        element :<Register/>,
    },
    {
        
        path:'/cardapio',
        element :(
            <>
            <Header/>
            <Menu/>
            </>
        ),
    },
    {
        path:'/carrinho',
        element:<Cart/>
   },

   {
    path:'/checkout',
    element:<Checkout/>
},

{
    path:'/complete',
    element:<CompletePayment/>
},


]);