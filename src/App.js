import React from "react";
import { Layout } from "antd";
import "./App.css";
import MainContent from "./components/Table";

const { Header, Sider, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          Header
        </Header>
        <Layout className="main">
          <Sider className="sider">Sider</Sider>
          <MainContent />
        </Layout>
      </Layout>
    );
  }
}

export default App;
