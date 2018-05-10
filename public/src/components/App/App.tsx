import {CssBaseline} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {TableStore} from '../../stores';
import Header from '../Header/Header';
import MatchList from '../MatchList/MatchList';
import NotFound from '../NotFound/NotFound';
import Palette from '../Palette/Palette';
import TableView from '../TableView/TableView';
import TournamentList from '../TournamentList/TournamentList';

const decorate = withStyles(({typography}) => ({
  main: {
    fontFamily: typography.fontFamily,
  },
}));

const table = (props: object) => (
  <TableView
    store={new TableStore({
      chars: ['position', 'teamName', 'matches', 'w', 'd', 'l', 'goals for',
        'goals against', 'goal difference', 'points'],
      order: 'asc',
      sort: 'position',
    })}
    {...props}
  />);

const results = (props: object) => (
  <MatchList type='results' {...props} />
);

const fixtures = (props: object) => (
  <MatchList type='fixtures' {...props} />
);

const App = ({classes}: any) => (
  <div className={classes.main}>
    <Palette>
      <CssBaseline/>
      <HashRouter>
        <React.Fragment>
          <Header/>

          <Switch>
            <Route exact={true} path='/' component={TournamentList}/>
            <Route path='/tournament/:id' component={table}/>
            <Route path='/results/:id' component={results}/>
            <Route path='/fixtures/:id' component={fixtures}/>
            <Route component={NotFound}/>
          </Switch>
        </React.Fragment>
      </HashRouter>
    </Palette>
  </div>
);

export default decorate(App);
