import React from "react";
import { Table } from "antd";
import axios from "axios";
import { SERVERADDRESS } from "../config";

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
    title: "createdAt",
    dataIndex: "createdAt",
    width: "15%"
  },
  {
    title: "updatedAt",
    dataIndex: "updatedAt",
    width: "15%"
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
    const res = await axios.get(`${SERVERADDRESS}/store/list`);
    this.setState({
      storeData: res.data.data.map(store => {
        store.key = store.id;
        return store;
      })
    });
  }

  render() {
    return (
      <Table
        className="table"
        size="small"
        columns={columns}
        dataSource={this.state.storeData}
      />
    );
  }
}
