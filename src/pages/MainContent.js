import React from "react";
import { Table, Layout, Button } from "antd";
import TableData from "../components/Table";
//import "../components/Table.css";
import "./MainContent.css";

const { Column } = Table;
const { Header, Sider, Content, Footer } = Layout;

class MainContent extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Content className="content">
        <div>
          <div>
            <span>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <TableData rowSelection={rowSelection} />
        </div>
      </Content>
    );
  }
}

export default MainContent;
