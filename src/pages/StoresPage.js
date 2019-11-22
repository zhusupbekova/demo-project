import React from "react";
import { Layout } from "antd";
import { StoreTable } from "../components/StoreTable";
import "./MainContent.css";
const { Content } = Layout;

export class StoresPage extends React.Component {
  render() {
    return (
      <Content className="content">
        <StoreTable />
      </Content>
    );
  }
}
