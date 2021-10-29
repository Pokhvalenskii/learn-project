import { useSelector } from 'react-redux';
import { PublicRoute } from '../PublicRoute/PublicRoute'
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";



function App() {

  const storage = useSelector((state) => state)

  return (
    <>
      {!storage.loggedIn.loggedIn ? <PublicRoute /> : <PrivateRoute />}      
    </>
  );
}

export default App;

