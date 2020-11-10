import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./components/routing/Routes";
import 'materialize-css'
import {Navbar} from "./components/layout/Navbar";

function App() {
    const routes = useRoutes(true);
  return (
      <Router>
          <Navbar/>
          {routes}
      </Router>
  );
}

export default App;
