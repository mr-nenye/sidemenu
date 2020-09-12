import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "./component/Layout";
import { Header } from './component/header';
import { PageOne } from "./pages/pageone";

const menuItems = [
  {
    name: "dashboard",
    label: "dashboard",
    link: "/dashboard",
  },
  {
    name: "page one",
    label: "Page One",
    link: "/path-one",
  },
  {
    name: "page two",
    label: "Page Two",
    link: "/page-two",
  },
];


const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Router>
      <Switch>
        <Route path="/*">
          <Header topBarPosition="relative" />
          <Layout
            menuItems={menuItems}
            toggleMenu={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
            spaceTop="80px"
          // appBrand={Logo}
          >
            <div>
              <Route exact path="/path-one" component={PageOne} />
            </div>
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}

// const App = () => <Sidebar menuItems={menuItems} />;

export default App;
