import { useState, Component, useEffect } from 'react';
import { Button, Col, Row, Space, Table, Modal, Form, Input, Select, DatePicker, message, Upload } from 'antd';
import axios from 'axios';
import './App.css';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from "react-hook-form"



function App() {
  const baseUrl = "https://localhost:7299/api/Employee";

  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm();

  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    country: "",
    state: "",
    city: "",
    zipCode: "",
    password: "",
    created: "",
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
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  //Post: Employees
  const handleCreate = () => {
    try {

      const formData = new FormData();
      const formValues = form.getFieldsValue();

      console.log("formValues: ", formValues);

      Object.entries(formValues).forEach(([key, value]) => {
        // formData.append(key, value);
        formData.append("id", 0);
        formData.append("firstName", form.getFieldValue("FirstName"));
        formData.append("lastName", form.getFieldValue("LastName"));
        formData.append("email", form.getFieldValue("Email"));
        formData.append("gender", form.getFieldValue("Gender"));
        formData.append("maritalStatus", form.getFieldValue("MaritalStatus"));
        formData.append("birthDate", form.getFieldValue("BirthDate"));
        formData.append("hobbies", form.getFieldValue("Hobbies"));
        formData.append("photo", form.getFieldValue("Photo"));
        formData.append("salary", form.getFieldValue("Salary"));
        formData.append("address", form.getFieldValue("Address"));
        formData.append("countryId", form.getFieldValue("Country"));
        formData.append("stateId", form.getFieldValue("State"));
        formData.append("cityId", form.getFieldValue("City"));
        formData.append("zipCode", form.getFieldValue("ZipCode"));
        formData.append("password", form.getFieldValue("Password"));
        formData.append("created", null);
      });

      console.log("formData: " + formData);
      axios.post(baseUrl + "/AddEmployee", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important: Set the content type to form data
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => console.log(error));

      // setNewItem({
      //   id: "",
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   gender: "",
      //   maritalStatus: "",
      //   birthDate: "",
      //   hobbies: "",
      //   photo: "",
      //   salary: "",
      //   address: "",
      //   countryId: "",
      //   stateId: "",
      //   cityId: "",
      //   zipCode: "",
      //   password: "",
      // });

      setIsModalOpen(false);
      getAllEmployees();
      console.log("handleCreate method called")

    } catch (error) {
      alert("handleCreate: " + error);
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

  //photo upload
  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log("FileUpload Info: " + info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  /* return */
  return (
    <div className="App">
      <h1>Employee</h1>

      <div>
        <div style={{ alignitem: "left" }}>

          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add Employee
          </Button>

        </div>

        <Modal
          title="Add New Item"
          open={isModalOpen}
          onOk={handleCreate}
          onCancle={handleCancel}
        >
          <Form onFinish={handleCreate} form={form}>
            <Form.Item
              name={"ZipCode"} label={"ZipCode"} >
              <Input {...register("zipcode")} />
            </Form.Item>
            <Form.Item
              name={"FirstName"} label={"FirstName"} >
              <Input {...register("FirstName")} /> </Form.Item>
            {/* <Form.Item
              name={"LastName"} label={"LastName"} >
              <Input {...register("lastName")} /> </Form.Item>
            <Form.Item
              name={"Email"} label={"Email"}>
              <Input {...register("email")} /> </Form.Item>
            <Form.Item
              name={"Gender"} label={"Gender"} >
              <Select {...register("gender")}
                placeholder="--Select--"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="m">Male</Option>
                <Option value="f">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"Birthday"} label={"Birthday"} >
              <DatePicker {...register("Birthday")} /> </Form.Item>
            <Form.Item
              name={"Hobbies"} label={"Hobbies"} >
              <Input  {...register("hobbies")} /> </Form.Item>
            <Form.Item
              name={"Photo"} label={"Photo"} >
              <Upload {...props} {...register("Photo")}>
                <Button icon={<UploadOutlined />} >Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name={"Salary"} label={"Salary"} > <Input {...register("salary")} /> </Form.Item>
            <Form.Item
              name={"Address"} label={"Address"} >
              <TextArea rows={4}  {...register("address")} />
            </Form.Item>
            <Form.Item
              name={"Country"} label={"Country"} >
              <Select  {...register("country")}
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={10}>India</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"State"} label={"State"} >
              <Select  {...register("state")}
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={12}>Gujarat</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"City"} label={"City"} >
              <Select {...register("city")}
                placeholder="--Select--"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value={11}>Surat</Option>

              </Select>
            </Form.Item>
            <Form.Item
              name={"ZipCode"} label={"ZipCode"} >
              <Input {...register("zipcode")} />
            </Form.Item> */}


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
