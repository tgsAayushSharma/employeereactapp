import { useState, Component, useEffect } from 'react';
import { Button, Col, Row, Space, Table, Modal, Form, Input, Select, DatePicker, message, UploadFile } from 'antd';
import axios from 'axios';
import './App.css';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { useForm } from "react-hook-form"



function App() {
  const baseUrl = "https://localhost:7299/api/Employee";

  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm();

  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { TextArea } = Input;

  const [newItem, setNewItem] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    maritalStatus: "",
    birthDate: "",
    hobbies: "",
    photo: "",
    salary: "",
    address: "",
    countryId: "",
    stateId: "",
    cityId: "",
    zipCode: "",
    password: "",
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  //Get: getAllEmployees
  const getAllEmployees = async () => {
    axios.get(baseUrl + "/GetAllEmployees")
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        alert("No Data found!");
      });
  };


  //Form Method:
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false)
  };

  //Post: Employees
  const handleCreate = () => {
    try {

      axios.post(baseUrl + "/AddEmployee", { newItem });
      setNewItem({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        maritalStatus: "",
        birthDate: "",
        hobbies: "",
        photo: "",
        salary: "",
        address: "",
        countryId: "",
        stateId: "",
        cityId: "",
        zipCode: "",
        password: "",
      });

      setIsModalVisible(false);
      getAllEmployees();

    } catch (error) {
      alert(error);
    }
  };
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case 'm':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'f':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      // case 'other':
      //   form.setFieldsValue({
      //     note: 'Hi there!',
      //   });
      //   break;
      default:
    }
  };

  return (
    <div className="App">
      <h1>Employee</h1>

      <div>
        <div style={{ alignitem: "left" }}>

          <Button type="primary" color="green" onClick={showModal}>
            Add Employee
          </Button>

        </div>

        <Modal
          title="Add New Item"
          visible={isModalVisible}
          onOk={handleCancel}
          onCancle={handleCancel}
        >
          <Form onFinish={handleCreate} form={form}>

            <Form.Item
              name={"FirstName"} label={"FirstName"} rules={[{ required: true, message: "Please Enter FirstName!" }]}>
              <Input {...register("firstName", { required: true, maxLength: 20 })} />
            </Form.Item>
            <Form.Item
              name={"LastName"} label={"LastName"} rules={[{ required: true, message: "Please Enter LastName!" }]}> <Input /> </Form.Item>
            <Form.Item
              name={"Email"} label={"Email"} rules={[{ required: true, message: "Please Enter Email" }]}> <Input /> </Form.Item>
            <Form.Item
              name={"Gender"} label={"Gender"} rules={[{ required: true, message: "Please Enter Gender" }]}>
              <Select {...register("gender", { required: true, maxLength: 1 })}
                placeholder="--Select--"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="m">Male</Option>
                <Option value="f">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"Birthday"} label={"Birthday"} rules={[{ required: true, message: "Please Enter Birthday" }]}> <DatePicker /> </Form.Item>
            <Form.Item
              name={"Hobbies"} label={"Hobbies"} rules={[{ required: false, message: "Please Enter Hobbies" }]}> <Input /> </Form.Item>
            <Form.Item
              name={"Photo"} label={"Photo"} rules={[{ required: false, message: "Please Enter Photo" }]}> <Input /> </Form.Item>
            <Form.Item
              name={"Salary"} label={"Salary"} rules={[{ required: false, message: "Please Enter Salary" }]}> <Input /> </Form.Item>
            <Form.Item
              name={"Address"} label={"Address"} rules={[{ required: false, message: "Please Enter Address" }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name={"Country"} label={"Country"} rules={[{ required: false, message: "Please Enter Country" }]}>
              <Select
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={10}>India</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"State"} label={"State"} rules={[{ required: false, message: "Please Enter State" }]}>
              <Select
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={12}>Gujarat</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"City"} label={"City"} rules={[{ required: false, message: "Please Enter City" }]}>
              <Select
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={11}>Surat</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"ZipCode"} label={"ZipCode"} rules={[{ required: false, message: "Please Enter ZipCode" }]}>
              <Input {...register("zipcode", { required: false, maxLength: 6 })} />
            </Form.Item>


            {/* <Button htmlType="submit">Add</Button> */}

          </Form>

        </Modal>
      </div>

      <Table dataSource={employees}>
        <Column title="Id" dataIndex="id" key="id" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column title="MaritalStatus" dataIndex="maritalStatus" key="maritalStatus" />
        <Column title="BirthDay" dataIndex="birthDate" key="birthDate" />
        <Column title="Hobbies" dataIndex="hobbies" key="hobbies" />
        <Column title="Photo" dataIndex="photo" key="photo" />
        <Column title="Salary" dataIndex="salary" key="salary" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Country" dataIndex="countryId" key="countryId" />
        <Column title="State" dataIndex="stateId" key="stateId" />
        <Column title="City" dataIndex="cityId" key="cityId" />
        <Column title="ZipCode" dataIndex="zipCode" key="zipCode" />
        <Column title="Created" dataIndex="created" key="created" />
        <Column title="Action" key="action" render={() =>

          <Space size={'middle'}>
            <Button type="primary" primary>Update</Button>
            <Button type="primary" danger>Delete</Button>
          </Space>

        } />

      </Table>


    </div>
  );
}

export default App;
