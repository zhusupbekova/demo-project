import React from "react";
import { Modal, Button, Input, Form, Radio } from "antd";
import { axiosPost } from "../utils/request";

import "./Table.css";

class NewUserFormComponent extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Full Name">
          {getFieldDecorator("realName")(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Phone">
          {getFieldDecorator("phone")(<Input />)}
        </Form.Item>

        <Form.Item label="Avatar">
          {getFieldDecorator("avatarUrl")(<Input />)}
        </Form.Item>

        <Form.Item label="Nickname">
          {getFieldDecorator("nickName")(<Input />)}
        </Form.Item>

        <Form.Item label="Gender">
          {getFieldDecorator("gender", { initialValue: 0 })(
            <Radio.Group>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item label="City">
          {getFieldDecorator("city")(<Input />)}
        </Form.Item>

        <Form.Item label="Province:">
          {getFieldDecorator("province")(<Input />)}
        </Form.Item>

        <Form.Item label="Country">
          {getFieldDecorator("country")(<Input />)}
        </Form.Item>

        <Form.Item label="Language">
          {getFieldDecorator("language")(<Input />)}
        </Form.Item>

        <Form.Item>
          <div style={{ alignItems: "center" }}>
            <Button htmlType="submit">Ok</Button>{" "}
            <Button onClick={this.props.onCancel}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const NewUserForm = Form.create()(NewUserFormComponent);

export class NewUserModal extends React.Component {
  constructor() {
    super();
    this.state = { visible: false, value: "" };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = async value => {
    console.log(value);

    const res = await axiosPost(`/user/create`, value);
    console.log(res);
    const storeRes = await axiosPost(`/store/${this.props.storeId}/customer`, {
      openid: res.data.openid
    });
    console.log(res);
    console.log("store", storeRes);

    this.setState({ visible: false });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({ visible: false });
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="tag-modal">
        <Button type="primary" onClick={this.showModal}>
          New user
        </Button>
        <Modal
          title="new user"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <NewUserForm onOk={this.handleOk} onCancel={this.handleCancel} />
        </Modal>
      </div>
    );
  }
}
