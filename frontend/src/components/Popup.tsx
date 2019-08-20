import React, { useCallback } from "react";
import Form from "./Form";
import "antd/dist/antd.css";
import axios from "axios";
import uniqid from "uniqid";
const Popup = (props: any) => {
  const { visible, handleClose, title, record, type, showAlertMessage } = props;

  const handleCreate = useCallback(
    (formData: any, key: any) => {
      const form = formData;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }

        const data = values;
        data["emp_id"] = uniqid();
        const request = key
          ? axios.put(`http://127.0.0.1:8000/employees/${key}`, data)
          : axios.post(`http://127.0.0.1:8000/employees/`, data);
        request
          .then((res: any) => {
            showAlertMessage(
              res.data && res.data.message ? res.data.message : "Saved"
            );
            console.log(res);
          })
          .catch((err: any) => {
            showAlertMessage(err.data);
            console.log(err);
          });
      });
      form.resetFields();
    },
    [showAlertMessage]
  );

  const handleDelete = useCallback(
    (key: string) => {
      axios
        .delete(`http://127.0.0.1:8000/employees/${key}`)
        .then((res: any) => {
          showAlertMessage(
            res.data && res.data.message ? res.data.message : "Saved"
          );
        })
        .catch((err: any) => {
          console.log(err);
          showAlertMessage(err.data);
        });
    },
    [showAlertMessage]
  );

  return (
    <div>
      <Form
        title={title}
        visible={visible}
        record={record}
        onCreate={handleCreate}
        onEdit={handleCreate}
        onDelete={handleDelete}
        onCancel={() => handleClose(true)}
        type={type}
      />
    </div>
  );
};

export default Popup;
