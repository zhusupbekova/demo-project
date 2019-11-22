import React from "react";
import { Layout } from "antd";
import TableData from "../components/UserTable";
//import "../components/Table.css";
import "./MainContent.css";

const { Content } = Layout;

export class UsersPage extends React.Component {
  render() {
    console.log(this.props.storeId);
    return (
      <Content className="content">
        <TableData />
      </Content>
    );
  }
}
