import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CombinationEdit } from "./views/CombinationEdit";
import { Combinations } from "./views/Combinations";

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/combinations/:id`} component={CombinationEdit} />
          <Route path={`/combinations`} render={() => <Combinations />} />
          <Redirect from={`/`} to="/combinations" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
