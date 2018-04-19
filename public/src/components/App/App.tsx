import {CssBaseline} from 'material-ui';
import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import Palette from '../Palette/Palette';
import TableContainer from '../TableContainer/TableContainer';
import TournamentList from '../TournamentList/TournamentList';

const table = (props: object) => (
  <TableContainer
    {...props}
    chars={['position', 'teamName', 'matches', 'w', 'd', 'l', 'goals for',
      'goals against', 'goal difference', 'points']}
  />);

const App = () => (
  <Palette>
    <CssBaseline/>
    <Router>
      <React.Fragment>
        <Header/>

        <Switch>
          <Route exact={true} path='/' component={TournamentList}/>
          <Route
            path='/tournament/:id'
            render={table}
          />
          <Route component={NotFound}/>
        </Switch>
      </React.Fragment>
    </Router>
  </Palette>
);

export default App;
