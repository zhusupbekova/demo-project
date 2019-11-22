import React from "react";
import { Layout } from "antd";
import TableData from "../components/UserTable";
//import "../components/Table.css";
import "./MainContent.css";

const { Content } = Layout;

export class UsersPage extends React.Component {
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
