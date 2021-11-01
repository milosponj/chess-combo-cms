import { setCombinations, setGames, useStateValue } from "./state";
import * as React from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import { Combination, Game } from "./interfaces";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { CombinationEdit } from "./views/CombinationEdit";
import { CombinationList } from "./views/CombinationList";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data: gamesFromApi } = await axios.get<Game[]>(
          `${apiBaseUrl}/games`
        );
        dispatch(setGames(gamesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCombinations = async () => {
      try {
        const { data: combinationsFromApi } = await axios.get<Combination[]>(
          `${apiBaseUrl}/combinations`
        );
        dispatch(setCombinations(combinationsFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchGames();
    fetchCombinations();
  }, [dispatch]);

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
