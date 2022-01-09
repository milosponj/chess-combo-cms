import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Combination, Game } from "./interfaces";
import { getCombos, getGames } from "./services/api";
import { setCombinations, setGames, useStateValue } from "./state";
import { CombinationEdit } from "./views/CombinationEdit";
import { Combinations } from "./views/Combinations";
import { Games } from "./views/Games";
import { PlayerCreate } from "./views/PlayerCreate";
import { PlayerEdit } from "./views/PlayerEdit";
import { Players } from "./views/Players";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const combosFromApi: Combination[] = await getCombos();
        const gamesFromApi: Game[] = await getGames();
        dispatch(setCombinations(combosFromApi));
        dispatch(setGames(gamesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={`/players/add`} component={PlayerCreate} />
          <Route path={`/players/:id`} component={PlayerEdit} />
          <Route path={`/players`} component={Players} />
          <Route path={`/combinations/:id`} component={CombinationEdit} />
          <Route path={`/combinations`} render={() => <Combinations />} />
          <Route path={`/games`} render={() => <Games />} />
          <Redirect from={`/`} to="/combinations" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
