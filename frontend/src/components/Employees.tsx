import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import axios from "axios";
import { Table, Button, Alert } from "antd";
import "antd/dist/antd.css";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [state, setState] = useState<{
    visible?: boolean;
    record?: any;
    type?: any;
    alertMessage?: string;
    isCancel?: boolean;
  }>({
    visible: false,
    record: null,
    type: "add",
    alertMessage: "",
    isCancel: false
  });
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname"
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname"
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div>
          <Button onClick={() => showModal(record, "edit")}>Edit</Button>{" "}
          <Button type="danger" onClick={() => showModal(record, "delete")}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  const showModal = (record?: any, type?: string) => {
    setState({ visible: true, record, type: type || "add" });
  };

  const handleCloseAlertMessage = () => {
    setState({ alertMessage: "" });
  };
  const handleAlertMessage = (alertMessage: any) => {
    setState({
      visible: false,
      type: state.type,
      alertMessage
    });
  };
  const handleClose = () => {
    setState({
      visible: false,
      type: state.type
    });
  };
  useEffect(() => {
    if (state.visible === false && !state.isCancel)
      axios
        .get("http://127.0.0.1:8000/employees/")
        .then((res: any) => {
          setEmployees(res.data);
        })
        .catch((err: any) => {
          console.log(err);
          setEmployees([]);
        });
  }, [state.visible, state.isCancel]);

  const data = employees.map((x: any) => ({
    key: x.id,
    firstname: x.firstname,
    lastname: x.lastname
  }));

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Employee
      </Button>
      <Popup
        title={
          state.type === "edit"
            ? `Edit Employee`
            : state.type === "delete"
            ? `Delete Employee`
            : `Add Employee`
        }
        visible={state.visible}
        handleClose={handleClose}
        record={state.record}
        type={state.type}
        showAlertMessage={handleAlertMessage}
      />
      <Table columns={columns} dataSource={data} />
      {state.alertMessage ? (
        <Alert
          message={state.alertMessage
          }
          type={
            state.type === "edit"
              ? `warning`
              : state.type === "delete"
              ? `error`
              : `success`
          }
          showIcon
          closable
          afterClose={handleCloseAlertMessage}
        />
      ) : null}
    </div>
  );
};

export default Employees;
