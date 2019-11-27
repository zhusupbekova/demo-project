import React from "react";
import { Layout, Icon } from "antd";
import { Link } from "react-router-dom";
import "./Table.css";
const { Header } = Layout;

class PageHeader extends React.Component {
  render() {
    return (
      <Header className="header">
        {/* <div className="logo" /> */}
        <Link to={`/stores`}>
          <div className="stores-link">
            <Icon type="home" />
            {"  "} Stores
          </div>
        </Link>
        <Link to={`/signin`}>
          <div className="log-out">Log out</div>
        </Link>
      </Header>
    );
  }
}

export default PageHeader;
