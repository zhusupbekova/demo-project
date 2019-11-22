import React from "react";
import { Layout } from "antd";
import TagsTable from "../components/TagsTable";
import "./MainContent.css";

const { Content } = Layout;

export class TagsPage extends React.Component {
  render() {
    return (
      <Content className="content">
        <TagsTable />
      </Content>
    );
  }
}
