import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css';
import {Layout} from "./Layout.jsx";

import HomePage from './pages/HomePage.jsx';
import PopupContextProvider from './context/PopupContextProvider.jsx';
import GameContextProvider from './context/GameContextProvider.jsx';
import PlayPage from './pages/PlayPage.jsx'
import GamePage from './pages/GamePage.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import SoloGamePlay from './pages/SoloGamePlay.jsx'
import AboutPage from './pages/AboutPage.jsx';

const router = createBrowserRouter([
    {
        path:'/',
        exact:true,
        element:<Layout />,
        children:[
            {
                path:'/',
                element:<HomePage />,
            },
            {
                path:'/play',
                element:<PlayPage />,
            },
            {
                path:'/game/:roomcode',
                element:<GamePage />
            },
            {
                path:'/solo',
                element:<SoloGamePlay />
            },
            {
                path:'/about',
                element:<AboutPage />
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <GameContextProvider>
                <PopupContextProvider>
                    <RouterProvider router={router} />
                </PopupContextProvider>
            </GameContextProvider>
        </AuthProvider>
    </React.StrictMode>,
)
