import React from "react";
import { Table, Avatar, Popconfirm, Form, Tag } from "antd";
import { EditableCell, EditableContext } from "./EditableCell";
import users from "../data/usersData";
import axios from "axios";
import "./Table.css";
import { SERVERADDRESS } from "../config";
import { tsImportEqualsDeclaration } from "@babel/types";

class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      userData: users.map(user => {
        user.key = user.id;
        return user;
      }),
      editingKey: ""
    };

    this.columns = [
      {
        title: "id",
        dataIndex: "id",
        width: "5%"
      },
      {
        title: "openid",
        dataIndex: "openid",
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
        title: "nickname",
        dataIndex: "nickname",
        width: "10%",
        editable: true
      },
      {
        title: "name",
        dataIndex: "name",
        width: "10%",
        editable: true
      },
      {
        title: "head Img",
        dataIndex: "headImg",
        width: "5%",
        editable: true,
        render: (_, row) => <Avatar src={row.headImg} />
      },
      // {
      //   title: "tags",
      //   dataIndex: "tags",
      //   width: "5%",
      //   editable: true,
      //   render: tags => (
      //     <span>
      //       {tags.map(tag => (
      //         <Tag color="blue" key={tag}>
      //           {tag}
      //         </Tag>
      //       ))}
      //     </span>
      //   )
      // },
      {
        title: "createdAt",
        dataIndex: "createdAt",
        width: "13%"
      },
      {
        title: "updatedAt",
        dataIndex: "updatedAt",
        width: "13%"
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.key)}
            >
              Edit
            </a>
          );
        }
      },
      {
        title: "action",
        dataIndex: "",
        key: "x",
        render: (_, row) => (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(row)}
          >
            <a>Delete</a>
          </Popconfirm>
        )
      }
    ];
  }

  // async componentDidMount() {
  //   const res = await axios.get(`${SERVER_ADDRESS}/store/${storeId}/customers`);
  //   console.log(res);
  //   this.setState({ data: res.data });
  // }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.userData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ userData: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ userData: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = item => {
    const newData = this.state.userData.filter(i => i.id !== item.id);
    this.setState({ userData: newData });
  };

  async componentDidMount() {
    const res = await axios.get(`${SERVERADDRESS}/store/1/customers`);
    console.log(res);
    this.setState({
      userData: res.data.data.map(user => {
        user.key = user.id;
        return user;
      })
    });
  }

  // handleChange(e) {
  //   // Variable to hold the original version of the list
  //   let currentList = [];
  //   // Variable to hold the filtered list before putting into state
  //   let newList = [];

  //   // If the search bar isn't empty
  //   if (e.target.value !== "") {
  //     // Assign the original list to currentList
  //     currentList = this.props.items;

  //     // Use .filter() to determine which items should be displayed
  //     // based on the search terms
  //     newList = currentList.filter(item => {
  //       // change current item to lowercase
  //       const lc = item.toLowerCase();
  //       // change search term to lowercase
  //       const filter = e.target.value.toLowerCase();
  //       // check to see if the current list item includes the search term
  //       // If it does, it will be added to newList. Using lowercase eliminates
  //       // issues with capitalization in search terms and search content
  //       return lc.includes(filter);
  //     });
  //   } else {
  //     // If the search bar is empty, set newList to original task list
  //     newList = this.props.items;
  //   }
  //   // Set the filtered state based on what our rules added to newList
  //   this.setState({
  //     filtered: newList
  //   });
  // }
  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <EditableContext.Provider value={this.props.form}>
        {/* <br />
        <Search
          placeholder="input search text"
          onChange={this.handleChange}
          style={{ width: 400 }}
        />
        <br /> */}
        <Table
          className="table"
          size="small"
          components={components}
          bordered
          dataSource={this.state.userData}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(TableData);
