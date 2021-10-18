import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { CombinationEdit } from "./views/CombinationEdit";
import { CombinationList } from "./views/CombinationList";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path={`/combinations/:id`} component={CombinationEdit} />
        <Route path={`/combinations`} component={CombinationList} />
        <Redirect from={`/`} to="/combinations" />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
