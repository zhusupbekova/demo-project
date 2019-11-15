import React, { useState } from "react";
import { Layout } from "antd";
const { Header } = Layout;

class PageHeader extends React.Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        Header
      </Header>
    );
  }
}

export default PageHeader;
