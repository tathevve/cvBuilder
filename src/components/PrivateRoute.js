import React from 'react';
import { Route,Redirect } from 'react-router-dom';


const PrivateRoute = (props) => {

    const logout = () => {
        localStorage.removeItem('authorized')
    }
    return (
        <>
        <nav>
            <ul>
                <li>
                    <a href='#' onClick={logout}>Logout</a>
                </li>
            </ul>
        </nav>
        {localStorage.getItem('authorized') ? (
            <Route {...props}/>
        ) : <Redirect to='/'/>}
        </>
    )
} 

export default PrivateRoute;