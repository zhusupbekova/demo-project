import React from "react";
import { Table, Button, Avatar } from "antd";
import reqwest from "reqwest";
import users from "../data/users";
import "./Table.css";
const { Column } = Table;

class TableData extends React.Component {
  constructor() {
    super();
    this.state = { data: users };
    this.handleDelete = this.handleDelete.bind(this);
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: false,
  //     data: [],
  //     pagination: {}
  //   };
  // }
  // async componentDidMount() {
  //   await this.fetch();
  // }

  // fetch = async (params = {}) => {
  //   console.log("params:", params);
  //   this.setState({ loading: true });
  //   const data = await reqwest({
  //     url: "https://randomuser.me/api",
  //     method: "get",
  //     data: {
  //       results: 10,
  //       ...params
  //     },
  //     type: "json"
  //   });

  //   console.log("my data", data);
  //   const pagination = { ...this.state.pagination };
  //   // Read total count from server
  //   pagination.total = data.totalCount;
  //   // pagination.total = 200;
  //   this.setState({
  //     loading: false,
  //     data: data.results,
  //     pagination
  //   });
  // };

  handleDelete = item => {
    // TODO: handle delete
    console.log(item);
    const data = this.state.data.filter(i => i.id !== item.id);
    this.setState({ data });
  };

  render() {
    return (
      <Table
        size={"small"}
        className="table"
        // rowSelection={this.props.rowSelection}
        dataSource={this.state.data}
      >
        <Column title="id" dataIndex="id" key="id" />
        <Column title="openid" dataIndex="openid" key="openid" />
        <Column title="phone" dataIndex="phone" key="phone" />
        <Column title="email" dataIndex="email" key="email" />
        <Column title="nickname" dataIndex="nickname" key="nickname" />
        <Column title="name" dataIndex="name" key="name" />
        <Column
          title="headImg"
          dataIndex="headImg"
          key="headImg"
          render={(_, row) => <Avatar src={row.headImg} />}
        />
        <Column title="createdAt" dataIndex="createdAt" key="createdAt" />
        <Column title="updatedAt" dataIndex="updatedAt" key="updatedAt" />

        <Column
          title="Actions"
          dataIndex=""
          key="x"
          render={(_, row) => (
            <Button type="link" onClick={() => this.handleDelete(row)}>
              Delete
            </Button>
          )}
        />
      </Table>
    );
  }
}

export default TableData;
