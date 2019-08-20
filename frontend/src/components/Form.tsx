import React from "react";
import { Modal, Form, Input } from "antd";
import "antd/dist/antd.css";
const InputForm = Form.create<any>({ name: "form_in_modal" })((props: any) => {
  const { visible, title, onCancel, onCreate, form, record, onDelete, type } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title={title}
      okText={title}
      onCancel={onCancel}
      onOk={() => {
        type==="edit"?
        onCreate(form, record.key):type==="delete"?onDelete(record.key):onCreate(form)
      }}
    >
      {type==="delete" && record ? (
          `Do you want to delete ${record.firstname} data?`
         
      ) : (
        <Form layout="vertical">
          <Form.Item label="First Name">
            {getFieldDecorator("firstname", {
              initialValue: record && record.firstname,
              rules: [
                {
                  required: true,
                  message: `Please enter first name of the employee`
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastname", {
              initialValue: record && record.lastname,
              rules: [
                {
                  required: true,
                  message: `Please enter last name of the employee`
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
});

export { InputForm as default };
