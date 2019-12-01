import React from "react";
import { Modal, Button, Upload, Icon, message } from "antd";
import { axiosPost, axiosGet } from "../utils/request";

import "./Table.css";

export class NewSeedModal extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      usersFile: [],
      tagsFile: [],
      uploading: false
    };
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  handleUpload = async () => {
    const { usersFile, tagsFile } = this.state;

    if (usersFile.length !== 1 || tagsFile.length !== 1) {
      message.error("You need exactly one user and tag file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tags", tagsFile[0]);
      formData.append("users", usersFile[0]);

      this.setState({
        uploading: true
      });

      await axiosPost(`/seed/usersandtags/${this.props.storeId}`, formData);
    } catch (error) {
      message.error(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    } finally {
      this.setState({
        uploading: false,
        usersFile: [],
        tagsFile: []
      });
    }
  };

  render() {
    const { uploading, tagsFile, usersFile } = this.state;

    const userProps = {
      onRemove: file => {
        this.setState(state => {
          return {
            usersFile: []
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          usersFile: [file]
        }));
        return false;
      },
      fileList: usersFile
    };
    const tagProps = {
      onRemove: file => {
        this.setState(state => {
          return {
            tagsFile: []
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          tagsFile: [file]
        }));
        return false;
      },
      fileList: tagsFile
    };

    return (
      <>
        <a href="#" onClick={this.toggleModal}>
          upload
        </a>
        <Modal
          title="upload tags and users"
          visible={this.state.visible}
          footer={null}
          onCancel={this.toggleModal}
        >
          <div className="upload-seed-files">
            <div className="upload-seed-files-inner">
              <Upload {...userProps}>
                <Button>
                  <Icon type="upload" /> Select users file
                </Button>
              </Upload>
              <Upload {...tagProps}>
                <Button>
                  <Icon type="upload" /> Select tags file
                </Button>
              </Upload>
            </div>

            <div className="upload-seed-button">
              <Button
                loading={uploading}
                type="primary"
                onClick={this.handleUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
