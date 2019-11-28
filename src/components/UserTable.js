import React from "react";
import { Table, Avatar, Popconfirm, Form, Input, Select, Divider } from "antd";
import { EditableCell, EditableContext } from "./EditableCell";
import axios from "axios";
import "./Table.css";
import { SERVERADDRESS } from "../config";
const { Search } = Input;
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      userData: [],
      tagData: [],
      editingKey: "",
      query: ""
    };

    this.columns = tags => [
      {
        title: "id",
        dataIndex: "id"
        // width: "3%"
      },
      {
        title: "openid",
        dataIndex: "openid"
        // width: "7%"
      },
      {
        title: "phone",
        dataIndex: "phone",
        // width: "12%",
        editable: true
      },
      {
        title: "email",
        dataIndex: "email",
        // width: "12%",
        editable: true
      },
      {
        title: "nickname",
        dataIndex: "nickName",
        // width: "10%",
        editable: true
      },
      {
        title: "full name",
        dataIndex: "realName",
        // width: "10%",
        editable: true
      },
      {
        title: "avatar",
        dataIndex: "avatarUrl",
        width: "4%",
        render: (_, row) => <Avatar src={row.headImg} />
      },
      {
        title: "tags",
        dataIndex: "tags",
        width: "10%",

        render: () => (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={this.handleChange}
          >
            {tags}
          </Select>
        )
      },
      {
        title: "action",
        dataIndex: "action",
        // width: "20%",
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
              {/* <Divider type="vertical" /> */}
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a> Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record)}
              >
                <a>Delete</a>
              </Popconfirm>
            </span>
          );
        }
      },
      {
        title: "createdAt",
        dataIndex: "createdAt",
        width: "12%"
      },
      {
        title: "updatedAt",
        dataIndex: "updatedAt",
        width: "12%"
      }
    ];
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
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
        console.log(item);
        await axios.post(
          `${SERVERADDRESS}/user/updateUserInfo/${item.openid}`,
          {
            name: newData[index].name,
            email: newData[index].email,
            phone: newData[index].phone
          }
        );
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
    const res = await axios.get(
      `${SERVERADDRESS}/store/${this.props.storeId}/customers`
    );
    console.log(res);
    this.userDataCopy = res.data.map(user => {
      user.key = user.id;
      return user;
    });
    const tagres = await axios.get(
      `${SERVERADDRESS}/store/${this.props.storeId}/tags`
    );
    console.log(tagres);
    this.tagDataCopy = tagres.data.map(tag => {
      tag.key = tag.id;

      return <Option key={tag.id}>{tag.name}</Option>;
    });

    this.setState({
      userData: this.userDataCopy,
      tagData: this.tagDataCopy
    });
  }

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = this.userDataCopy.filter(element => {
        const lowerQuery = query.toLowerCase();
        const columns = [
          element.name,
          element.openid,
          element.email,
          element.nickname,
          element.phone
        ];
        return columns.some(columns =>
          columns.toLowerCase().includes(lowerQuery)
        );
      });

      this.setState({ userData: filteredData, query: query });
    });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns(this.state.tagData).map(col => {
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
        <Search
          placeholder="Search for..."
          value={this.state.query}
          onChange={this.handleInputChange}
          style={{ width: 400 }}
          className="search-bar"
        />
        <br />
        <Table
          scroll={{ x: true }}
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

export default Form.create()(UserTable);
