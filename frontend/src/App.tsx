import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { CombinationCreate } from "./views/CombinationCreate";
import { CombinationEdit } from "./views/CombinationEdit";
import { Combinations } from "./views/Combinations";
import { GameCreate } from "./views/GameCreate";
import { GameEdit } from "./views/GameEdit";
import { Games } from "./views/Games";
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
          <Route path={`/combinations/add`} component={CombinationCreate} />
          <Route path={`/combinations/:id`} component={CombinationEdit} />
          <Route path={`/combinations`} render={() => <Combinations />} />
          <Route path={`/games/add`} component={GameCreate} />
          <Route path={`/games/:id`} component={GameEdit} />
          <Route path={`/games`} render={() => <Games />} />
          <Route path={`/`} render={() => <Combinations />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
