import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { CombinationEdit } from "./views/CombinationEdit";
import { CombinationList } from "./views/CombinationList";

const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path={`/combinations/:id`} component={CombinationEdit} />
          <Route path={`/combinations`} render={() => <CombinationList/>} />
          <Redirect from={`/`} to="/combinations" />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
