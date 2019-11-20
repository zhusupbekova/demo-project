import React from "react";
import {
  Table,
  Button,
  Avatar,
  Input,
  InputNumber,
  Popconfirm,
  Form
} from "antd";
// import reqwest from "reqwest";
import users from "../data/users";
import "./Table.css";
const { Column } = Table;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = args => {
    const { getFieldDecorator } = args;

    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}
class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      data: users.map(user => {
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
        title: "openedid",
        dataIndex: "openedid",
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
        title: "headImg",
        dataIndex: "headImg",
        width: "5%",
        editable: true,
        render: (_, row) => <Avatar src={row.headImg} />
      },
      {
        title: "createdAt",
        dataIndex: "createdAt",
        width: "10%"
      },
      {
        title: "updatedAt",
        dataIndex: "updatedAt",
        width: "10%"
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
          <Button type="link" onClick={() => this.handleDelete(row)}>
            Delete
          </Button>
        )
      }
    ];
  }
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = item => {
    // TODO: handle delete
    console.log(item);
    const data = this.state.data.filter(i => i.id !== item.id);
    this.setState({ data });
  };

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
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
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
