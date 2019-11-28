import React from "react";
import { Layout } from "antd";

import { NewUserModal } from "../components/NewUserModal";
import UserTable from "../components/UserTable";
import "./MainContent.css";

const { Content } = Layout;

export class UsersPage extends React.Component {
  render() {
    return (
      <Content className="content">
        <NewUserModal storeId={this.props.storeId} />
        <UserTable storeId={this.props.storeId} />
      </Content>
    );
  }
}
