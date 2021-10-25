import { book } from '../../book/book';
import { Route, Switch, Redirect } from 'react-router-dom';
import { SignUp } from '../SignUp/SignUp';
import { SignIn } from '../SignIn/SignIn';

function PublicRoute() {
  return (
    <Switch>
      <Route path={book.signin} component={SignIn}/>
      <Route path={book.signup} component={SignUp}/>
      <Redirect to={book.signin} />
    </Switch>
  )
}

export { PublicRoute };