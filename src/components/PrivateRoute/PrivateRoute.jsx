import { book } from '../../book/book';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Table } from '../Table/Table'

function PrivateRoute() {
  return (
    <Switch>
      <Route path={book.main} component={Table} />
      <Redirect to={book.main} />
    </Switch>
  );
}

export { PrivateRoute };