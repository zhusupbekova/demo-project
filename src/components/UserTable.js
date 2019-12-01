import React from "react";
import {
  Table,
  Avatar,
  Popconfirm,
  Form,
  Input,
  Select,
  Divider,
  message,
  Tag
} from "antd";

import { EditableCell, EditableContext } from "./EditableCell";
import { axiosGet, axiosPost, axiosDelete } from "../utils/request";

import "./Table.css";

const { Search } = Input;
const { Option } = Select;

// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

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
      // {
      //   title: "ID",
      //   dataIndex: "id"
      //   // width: "3%"
      // },
      // {
      //   title: "openid",
      //   dataIndex: "openid"
      //   // width: "7%"
      // },
      {
        title: "Phone",
        dataIndex: "phone",
        // width: "12%",
        editable: true
      },
      {
        title: "E-mail",
        dataIndex: "email",
        // width: "12%",
        editable: true
      },
      {
        title: "Nickname",
        dataIndex: "nickName",
        // width: "10%",
        editable: true
      },
      {
        title: "Full name",
        dataIndex: "realName",
        // width: "10%",
        editable: true
      },
      {
        title: "Avatar",
        dataIndex: "avatarUrl",
        // width: "4%",
        render: (_, row) => <Avatar src={row.headImg} />
      },
      {
        title: "Tags",
        dataIndex: "userTags",
        width: "10%",

        render: (_, row) => {
          const editable = this.isEditing(row);
          if (editable) {
            return (
              <Select
                labelInValue
                defaultValue={row.userTags}
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                onChange={value => this.handleChange(value, row)}
              >
                {tags}
              </Select>
            );
          }
          return (
            <span>
              {row.userTags.map(tag => (
                <Tag key={tag.key}>{tag.label}</Tag>
              ))}
            </span>
          );
        }
      },
      {
        title: "Action",
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
      }
      // {
      //   title: "createdAt",
      //   dataIndex: "createdAt",
      //   width: "12%"
      // },
      // {
      //   title: "updatedAt",
      //   dataIndex: "updatedAt",
      //   width: "12%"
      // }
    ];
  }

  handleChange = (value, row) => {
    row.userTags = value;
  };

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
      try {
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
          console.log(newData[index]);
          await axiosPost(`/user/${item.openid}/update`, newData[index]);
          await axiosPost(
            `/user/${item.openid}/setUserTags`,
            newData[index].userTags.map(tag => ({
              id: parseInt(tag.key),
              name: tag.label
            }))
          );

          this.setState({ userData: newData, editingKey: "" });
        } else {
          newData.push(row);
          this.setState({ userData: newData, editingKey: "" });
        }
        message.success("Edited successfuly");
      } catch (error) {
        message.error(
          error.response && error.response.data
            ? error.response.data.message
            : error.message
        );
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = async item => {
    try {
      await axiosDelete(`/store/${this.props.storeId}/customer/${item.openid}`);
      const newData = this.state.userData.filter(i => i.id !== item.id);
      this.setState({ userData: newData });
      message.success("Removed user");
    } catch (error) {
      message.error(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  };

  async componentDidMount() {
    const res = await axiosGet(`/store/${this.props.storeId}/customers`);
    console.log(res);
    this.userDataCopy = res.data.map(user => {
      user.key = user.id;
      user.userTags = user.userTags.map(tag => ({
        key: tag.tag.id.toString(),
        label: tag.tag.name
      }));
      return user;
    });

    const tagres = await axiosGet(`/store/${this.props.storeId}/tags`);
    this.tagDataCopy = tagres.data.map(tag => {
      tag.key = tag.id;

      return (
        <Option key={tag.id} value={tag.id.toString()}>
          {tag.name}
        </Option>
      );
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
          element.realName,
          element.email,
          element.nickName,
          element.phone
        ];
        return columns.some(column =>
          column.toLowerCase().includes(lowerQuery)
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
