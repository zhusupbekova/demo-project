import React from "react";
import { Layout } from "antd";
import "./App.css";
import { UsersPage } from "./pages/UsersPage";
import { StoresPage } from "./pages/StoresPage";
import { TagsPage } from "./pages/TagsPage";
import WrappedRegistrationForm from "./pages/RegisterForm";
import WrappedSigninForm from "./pages/SigninForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageHeader from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout className="page-wrapper">
          <PageHeader />
          <Layout className="content-layout">
            <Switch>
              <Route path="/" exact component={WrappedRegistrationForm} />
              <Route path="/signin" component={WrappedSigninForm} />
              <Route
                path="/users/:storeId"
                render={({ match }) => (
                  <UsersPage storeId={match.params.storeId} />
                )}
              />
              <Route path="/stores" component={StoresPage} />
              <Route
                path="/tags/:storeId"
                render={({ match }) => (
                  <TagsPage storeId={match.params.storeId} />
                )}
              />
            </Switch>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
