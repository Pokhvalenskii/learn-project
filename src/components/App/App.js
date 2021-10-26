import { useSelector } from 'react-redux';

import { PublicRoute } from '../PublicRoute/PublicRoute'
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { composeWithDevTools } from 'redux-devtools-extension';


function App() {
  // debugger;

  const storage = useSelector((state) => state)

  return (
    <>
      {/* {!storage.loggedIn.loggedIn ? <PublicRoute /> : <PrivateRoute />} */}
      <PrivateRoute />
    </>
  );
}

export default App;

