import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

class PageHeader extends React.Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Link to={`/storespage`}>stores table</Link>
      </Header>
    );
  }
}

export default PageHeader;
