import React from "react";
import { Table, Layout, Button } from "antd";

import "./Table.css";

const { Column } = Table;
const { Header, Sider, Content, Footer } = Layout;

const data = [
  {
    key: "1",
    name: "Alina",
    lastName: "Zhusupbekova",
    username: "zhusupbekovalina"
  },

  {
    key: "2",
    name: "Osman Mesut",
    lastName: "Ozcan",
    username: "osmanmesutocan"
  },

  {
    key: "3",
    name: "Necmettin",
    lastName: "Karakaya",
    username: "necmettinkarakaya"
  }
];

class MainContent extends React.Component {
  render() {
    return (
      <Content className="content">
        Username Data
        <Table dataSource={data}>
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
