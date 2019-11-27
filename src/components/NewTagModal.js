import React from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";
import { SERVERADDRESS } from "../config";
import "./Table.css";

export class NewTagModal extends React.Component {
  constructor() {
    super();
    this.state = { visible: false, value: "" };
  }
  showModal = () => {
    this.setState({ visible: true });
  };
  handleOk = async e => {
    await axios.post(`${SERVERADDRESS}/store/${this.props.storeId}/addTag`, {
      tagName: this.state.value
    });
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
          New tag
        </Button>
        <Modal
          title="new tag"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={this.handleChange}
            placeholder="input new tag"
          ></Input>
        </Modal>
      </div>
    );
  }
}
