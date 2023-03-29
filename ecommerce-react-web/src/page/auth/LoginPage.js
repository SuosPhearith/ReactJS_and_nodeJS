import React, { useState } from 'react'
import { request } from '../../util/api'
import { message } from 'antd'

export default function LoginPage() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = () => {
    var params = {
      "username" : username,
      "password" : password
    }
    request("post","customer/login",params).then(res=>{
       if(res.data && res.data.is_login){
          // message.success("Login success")
          localStorage.setItem("is_login","1") // is_login = 1
          localStorage.setItem("profile",JSON.stringify(res.data.profile))
          window.location.href = "/"
       }else{
          message.warning(res.data.message)
       }
    })
  }

  return (
    <div>
       <h1>Login Page</h1>
        <input
          placeholder='username'
          onChange={(event)=>{
            setUsername(event.target.value)
          }}
        />
        <input 
          placeholder='password'
          onChange={(event)=>{
            setPassword(event.target.value)
          }}
        />
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}
