import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {

  return(
    <Route>
      {props.loggedIn === false && (<Redirect to='/signin'/>)}
      {props.loggedIn && (props.children)}
    </Route>
  )
}

export default ProtectedRoute;