import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CombinationEdit } from "./views/CombinationEdit";
import { Combinations } from "./views/Combinations";
import { PlayerCreate } from "./views/PlayerCreate";
import { PlayerEdit } from "./views/PlayerEdit";
import { Players } from "./views/Players";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/players/add`} component={PlayerCreate} />
          <Route path={`/players/:id`} component={PlayerEdit} />
          <Route path={`/players`} component={Players} />
          <Route path={`/combinations/:id`} component={CombinationEdit} />
          <Route path={`/combinations`} render={() => <Combinations />} />
          <Redirect from={`/`} to="/combinations" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
