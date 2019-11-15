import React from "react";
import { Table, Button } from "antd";
import reqwest from "reqwest";
import users from "../data/users";
const { Column } = Table;

class TableData extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      pagination: {}
    };
  }
  async componentDidMount() {
    await this.fetch();
  }

  fetch = async (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    const data = await reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 10,
        ...params
      },
      type: "json"
    });

    console.log("my data", data);
    const pagination = { ...this.state.pagination };
    // Read total count from server
    pagination.total = data.totalCount;
    // pagination.total = 200;
    this.setState({
      loading: false,
      data: data.results,
      pagination
    });
  };

  handleDelete = () => {
    // TODO: handle delete
    console.log("delete");
  };

  render() {
    return (
      <Table
        rowSelection={this.props.rowSelection}
        dataSource={this.state.data}
      >
        <Column title="Name" dataIndex="name.first" key="name" />
        <Column title="Last Name" dataIndex="name.last" key="lastname" />
        <Column title="username" dataIndex="email" key="username" />
        <Column
          title="Actions"
          dataIndex=""
          key="x"
          render={() => (
            <Button type="link" onClick={this.handleDelete}>
              Delete
            </Button>
          )}
        />
      </Table>
    );
  }
}

export default TableData;
