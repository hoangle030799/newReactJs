import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"




const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    if(!isAuthenticated) {
        return<Navigate to = '/Login'></Navigate>;
    }
    return(
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute