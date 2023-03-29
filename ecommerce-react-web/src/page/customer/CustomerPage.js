import "./CustomerPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DatePicker,
  Button,
  Space,
  Popconfirm,
  Input,
  Modal,
  Divider,
  Select,
  Radio,
  ConfigProvider,
  Spin,
  message,
  Table
} from "antd";
import {Config} from "../../util/service"
import {
  DeleteFilled,
  EditFilled,
  SaveFilled,
  FilterOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { request } from "../../util/api";
import dayjs from "dayjs";
// import 'dayjs/locale/km';
// import locale from 'antd/es/date-picker/locale/km_KH';
import "dayjs/locale/en";
import locale from "antd/locale/en_US";
// import { request } from "../../util/api"

const { Option } = Select;
const CustomerPage = () => {
  const [list, setList] = useState([]);
  const [totalRcord, setTotalRecord] = useState(0);
  const [defaultPageSize, setDefaultPageSize] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading,setLoading] = useState(false)

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("1");
  const [dob, setDob] = useState(dayjs()); // return current date
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(1);
  const [customerId, setCustomerID] = useState(null);



  const [textSearch,setTextSearch] = useState("")
  const [page,setPage] = useState(1)
  

  useEffect(() => {
    getList(); // call funcion getList
  }, [page]);

  // create a function fetch data from api
  const getList = () => {
    setLoading(true)
    request("get", "customer/getList?page="+page).then((res) => {
        if(res){
            setList(res.data.list_customer);
            setTotalRecord(res.data.total_record)
            setDefaultPageSize(res.data.pagination)
            setLoading(false)
        }else{
            setLoading(false)
        }
      })
  };

  const onConfirmDelete = (id) => {
    setLoading(true)
    request("delete", "customer/delete/" + id).then((res) => {
      getList();
      setLoading(false)
      message.success(res.data.message)
    });
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handSubmit = () => {
    setLoading(true)
    if (customerId == null) {
      request("post", "customer/create", {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        dob: dayjs(dob).format("YYYY-MM-DD"),
        tel: tel,
        email: email,
        is_active: isActive,
      }).then((res) => {
        getList();
        clearForm();
        setVisibleModal(false);
        setLoading(false)
        message.success(res.data.message)
      });
    } else {
      request("put", "customer/update", {
        customer_id: customerId,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        dob: dayjs(dob).format("YYYY-MM-DD"),
        tel: tel,
        email: email,
        is_active: isActive,
      }).then((res) => {
        getList();
        clearForm();
        setVisibleModal(false);
        setLoading(false)
        message.success(res.data.message)
      });
    }
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setGender("1");
    setDob(dayjs());
    setTel("");
    setEmail("");
    setIsActive(1);
    setCustomerID(null);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    clearForm();
  };

  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  const handleClickEdit = (item, index) => {
    setVisibleModal(true);

    setFirstname(item.firstname);
    setLastname(item.lastname);
    setGender(item.gender + "");
    setDob(dayjs(item.dob).format("YYYY-MM-DD"));
    setTel(item.tel);
    setEmail(item.email);
    setIsActive(item.is_active);
    setCustomerID(item.customer_id);
  }

  const getStringGender = (gender) => {
    if(gender == 1){
        return "Male"
    }else {
        return "Female"
    }

  }

  return (
    <div>
      <Spin spinning={loading}>
        <div className="rowBetween">
          <div>
            <Space>
              <div className="pageTitle">Customer</div>
              <Input.Search placeholder="Search"
                onChange={(event)=>{
                  setTextSearch(event.target.value)
                }}
              />
              <DatePicker />
              <DatePicker />
              <Button onClick={()=>getList()} type="primary">
                <FilterOutlined />
              </Button>
            </Space>
          </div>
          <Button onClick={handleOpenModal} type="primary">
            <SaveFilled /> Create New
          </Button>
        </div>
        <Table
          rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
          className="row"
          size="small"
          bordered={true}
          dataSource={list}
          pagination={{
            total : totalRcord, // tatal record
            defaultPageSize : Config.pagination, // total page
            defaultCurrent : 1,
            onChange : (page) =>{
              setPage(page)
            }
          }}
          columns={[
            {
              title : "No",
              render : (value,record,index) => (index+1)
              // render : (value,record,index) => (<Button>{index+1}</Button>)
              // render : (value,record,index) => (
              //   <div>
              //     <div>{index}</div>
              //   </div>
              // )
            },
            {
              title : "Firstname",
              dataIndex : "firstname",
              key : "firstname",
              filtered : true
            },
            {
              title : "Lastname",
              dataIndex : "lastname",
              key : "lastname"
            },
            {
              title : "Gender",
              dataIndex : "gender",
              key : "gender",
              render : (value,record,index) => (value == 1 ? "Male" : "Female") //
            },
            {
              title : "Dob",
              dataIndex : "dob",
              key : "dob",
              render : (value) => (dayjs(value).format("DD/MM/YYYY"))
            },
            {
              title : "Tel",
              dataIndex : "tel",
              key : "tel",
            },
            {
              title : "Email",
              dataIndex : "email",
              key : "email",
            },
            {
              title : "Action",
              render : (_,record,index) => (
                <Space>
                  <Popconfirm
                    placement="topRight"
                    title={"Delete"}
                    description={"Are sure to remove this customer"}
                    onConfirm={() => onConfirmDelete(record.customer_id)}
                    okText="Delete"
                    cancelText="No"
                  >
                    <Button type="primary" danger size="middle">
                      <DeleteFilled />Delete
                    </Button>
                  </Popconfirm>

                  <Button
                    size="middle"
                    type="primary"
                    onClick={() => handleClickEdit(record, index)}
                  >
                    <EditFilled />Edit
                  </Button>
                </Space>
              )
            }
          ]}
        />
        <Modal
          open={visibleModal}
          title={customerId == null ? "New customer" : "Update customer"}
          onCancel={handleCloseModal}
          footer={null}
          maskClosable={false}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              value={firstname}
              placeholder="firstname"
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
            />
            <Input
              value={lastname}
              placeholder="lastname"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <Select
              value={gender}
              defaultValue={"1"}
              style={{ width: "100%" }}
              onChange={(value) => {
                setGender(value);
              }}
            >
              <Option value={"1"}>Male</Option>
              <Option value={"0"}>Female</Option>
            </Select>
            <ConfigProvider locale={locale}>
              <DatePicker
                style={{ width: "100%" }}
                placement="bottomLeft"
                placeholder="Date of birth"
                format={"DD/MM/YYYY"} // user client 
                value={dayjs(dob, "YYYY-MM-DD")} // for date picker
                onChange={(date_js, dateString) => {
                  setDob(date_js);
                }}
              />
            </ConfigProvider>

            {/* <DatePicker 
                        // picker="year" 
                        // format={'YYYY/MM/DD'}
                        // defaultValue={moment()}
                        locale={locale}
                        style={{width:"100%"}}
                        placeholder="Date of birth"
                        value={dayjs(dob,"YYYY-MM-DD")}
                        onChange={(date,dateString)=>{
                            setDob(dateString)
                            // console.log(data)
                            // console.log(dateString)
                        }}
                    /> */}

            <Input
              value={tel}
              placeholder="tel"
              onChange={(event) => {
                setTel(event.target.value);
              }}
            />

            <Input
              value={email}
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <Radio.Group
              value={isActive}
              onChange={(event) => {
                setIsActive(event.target.value);
              }}
            >
              <Radio value={1}>Actived</Radio>
              <Radio value={0}>Disabled</Radio>
            </Radio.Group>

            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handSubmit} type="primary">
                {customerId == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Space>
        </Modal>
      </Spin>
    </div>
  );
};

export default CustomerPage;