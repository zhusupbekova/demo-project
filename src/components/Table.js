import React from "react";
import { Table, Layout, Button } from "antd";

import "./Table.css";
import users from "../data/users";

const { Column } = Table;
const { Header, Sider, Content, Footer } = Layout;

class MainContent extends React.Component {
  render() {
    return (
      <Content className="content">
        Username Data
        <Table dataSource={users}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Last Name" dataIndex="lastName" key="lastname" />
          <Column title="username" dataIndex="username" key="username" />
        </Table>
        <Button type="primary">Yes</Button>
        <Button type="danger">No</Button>
      </Content>
    );
  }
}

export default MainContent;
