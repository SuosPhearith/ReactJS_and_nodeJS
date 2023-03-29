import React, { useState } from 'react'
import { request } from '../../util/api'
import { Button, Form, message,Input,Checkbox } from 'antd'
import "./LoginPage.css"
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function LoginPage() {

  const onFinish = (fields) => {

    var params = {
      "username": fields.username,
      "password": fields.password
    }
    request("post", "customer/login", params).then(res => {
      if (res.data && res.data.is_login) {
        // message.success("Login success")
        localStorage.setItem("is_login", "1") // is_login = 1
        localStorage.setItem("profile", JSON.stringify(res.data.profile))
        window.location.href = "/"
      } else {
        message.warning(res.data.message)
      }
    })
  }

  return (
    <>
      <div className='loging-form'>
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="login-form-forgot">
            <a href="">Forgot password</a>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <div>
              Or <a href="">register now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
