import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined,
    LoginOutlined
  } from "@ant-design/icons";
  import { Layout, Menu, Button, theme,Dropdown, Divider } from "antd";
  import React, { useEffect, useState } from "react";
  import {
    useNavigate
  } from "react-router-dom"
  import "./LayoutOneComponent.css";
  
  const { Header, Sider, Content } = Layout;
  const LayoutOne = (props) => {
  
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("is_login") == "1"
  
    useEffect(()=>{
      if(!isLogin){
        navigate("/login")
      }
    },[])
  
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    const  handleChangeMenu = (item) => {
      navigate(item.key)
    }
  
    const handleLogout = () => {
      localStorage.setItem("is_login","0")
      window.location.href = "/login"
    }
  
    const menu = [
      {
        key: "/",
        icon: <UserOutlined />,
        label: "Dashboard",
      },
      {
        key: "/customer",
        icon: <VideoCameraOutlined />,
        label: "Customer",
      },
      {
        key: "/product",
        icon: <UploadOutlined />,
        label: "Product",
      },
      {
        key: "/user",
        icon: <UploadOutlined />,
        label: "User",
      }
    ]
  
    const menuUser = [
      {
        key : "1",
        label : (
            <a>
              Profile
            </a>
        )
      },
      {
        key : "2",
        label : (
          <a>
            Change password
          </a>
        )
      },
      {
        key : "3",
        label : (
          <a>
            Logout
          </a>
        ),
        icon : <LoginOutlined />,
        onClick : handleLogout
      },
    ]
  
    const profile = JSON.parse(localStorage.getItem("profile"))
  
    return (
      <Layout>
  
        <Sider  trigger={null} collapsible collapsed={collapsed}>
          {/* <div className="logoLayoutOne1">
            <div className={`${collapsed ? "profileContainAnimate1" : "profileContain1"}`}>
              ECM
            </div>
          </div> */}
          <div>
            <h1 style={{textAlign:"center",color:"#FFF"}}>ECM</h1>
            <hr style={{color:"#FFF"}} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={menu}
            onClick={handleChangeMenu}
          />
        </Sider>
  
        <Layout>
          <div className="headerLayoutOne">
              <MenuUnfoldOutlined
                  style={{fontSize:26,paddingLeft:20}}
                  onClick={()=>setCollapsed(!collapsed)}
              />
              <div>
                  <Dropdown
                    style={{width:150}}
                    menu={{
                      items:menuUser
                    }}
                    placement="bottomLeft"
                  >
                    <Button type="link" className={"iconProfile"}>
                      <UserOutlined />
                      {profile.firstname} {profile.lastname}
                      <DownOutlined/>
                    </Button>
                  </Dropdown>
              </div>
          </div>
          <div className="mainBody">
            {props.children}
          </div>
        </Layout>
        
      </Layout>
    );
  
  };
  export default LayoutOne;
  