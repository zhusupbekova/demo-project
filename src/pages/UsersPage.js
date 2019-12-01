import React from "react";
import { Layout } from "antd";
import UserTable from "../components/UserTable";
import "./MainContent.css";

const { Content } = Layout;

export class UsersPage extends React.Component {
  render() {
    return (
      <Content className="content">
        <UserTable storeId={this.props.storeId} />
      </Content>
    );
  }
}
