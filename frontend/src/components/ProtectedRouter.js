import { Navigate } from "react-router-dom";

function ProtectedRouter({element: Component, ...props}) {
    return (
        props.loggedIn ? <Component {...props}/>:<Navigate to="/sign-in" replace/> 
    )
}

export default ProtectedRouter;