import React from "react";
import { Table, Popconfirm, Form, Divider } from "antd";
import axios from "axios";
import { SERVERADDRESS } from "../config";
import { EditableCell, EditableContext } from "./EditableCell";

class TagsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsData: [],
      editingKey: ""
    };
    this.columns = [
      {
        title: "id",
        dataIndex: "id",
        width: "10%"
      },
      {
        title: "name",
        dataIndex: "name",
        width: "15%",
        editable: true
      },
      {
        title: "active",
        dataIndex: "active",
        width: "15%",
        render: t => (t ? t.toString() : "")
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
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: "10%",
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
    ];
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

      const newData = [...this.state.tagsData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });

        await axios.post(
          `${SERVERADDRESS}/store/${this.props.storeId}/updateTag/${item.id}`,
          {
            tagName: newData[index].name
          }
        );
        this.setState({ tagsData: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ tagsData: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = async item => {
    await axios.delete(
      `${SERVERADDRESS}/store/${this.props.storeId}/deleteTag/${item.id}`
    );
    const newData = this.state.tagsData.filter(i => i.id !== item.id);
    this.setState({ tagsData: newData });
  };

  async componentDidMount() {
    const res = await axios.get(
      `${SERVERADDRESS}/store/${this.props.storeId}/tags`
    );
    this.setState({
      tagsData: res.data.data.tags.map(tag => {
        tag.key = tag.id;
        return tag;
      })
    });
  }

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
          className="table"
          components={components}
          size="default"
          dataSource={this.state.tagsData}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        ></Table>
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(TagsTable);
