import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectRoute({children, user, redirect="/login"}) {

    if(!user) {
        return <Navigate to={redirect} />
    }

    else {
        return children ? children : <Outlet />
    }
}

export default ProtectRoute