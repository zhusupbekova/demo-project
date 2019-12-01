import React from "react";
import { Table, Divider } from "antd";
import { Link } from "react-router-dom";
import { NewSeedModal } from "./NewSeedModal";
import { axiosGet } from "../utils/request";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: "15%",
    editable: true
  },
  {
    title: "name",
    dataIndex: "name",
    width: "15%",
    editable: true
  },
  {
    title: "email",
    dataIndex: "email",
    width: "15%",
    editable: true
  },
  {
    title: "img",
    dataIndex: "img",
    width: "15%",
    editable: true
  },
  {
    title: "action",
    dataIndex: "action",
    width: "25%",
    render: (_, row) => (
      <span>
        <Link to={`/users/${row.id}`}>users</Link>
        <Divider type="vertical" />
        <Link to={`/tags/${row.id}`}>tags</Link>
        <Divider type="vertical" style={{ width: "2px" }} />
        <NewSeedModal storeId={row.id} />
      </span>
    )
  },
  {
    title: "createdAt",
    dataIndex: "createdAt"
    // width: "15%"
  },
  {
    title: "updatedAt",
    dataIndex: "updatedAt"
    // width: "15%"
  }
];

export class StoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeData: []
    };
  }

  async componentDidMount() {
    const res = await axiosGet("/store/list");

    console.log(res);
    this.setState({
      storeData: res.data.map(connection => {
        const store = connection.store;
        store.key = store.id;
        return store;
      })
    });
  }

  render() {
    return (
      <>
        <Table
          className="table"
          size="small"
          bordered
          columns={columns}
          dataSource={this.state.storeData}
        />
      </>
    );
  }
}
