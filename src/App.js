import React from "react";
import { Layout } from "antd";
import "./App.css";
import MainContent from "./pages/MainContent";
import WrappedRegistrationForm from "./pages/Form";
import LayoutPage from "./components/LayoutPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageHeader from "./components/Header";

const { Sider, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <PageHeader />
          <Layout className="content-layout">
            <Switch>
              <Route path="/" exact component={WrappedRegistrationForm} />
              <Route path="/maincontent" component={MainContent} />
            </Switch>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
