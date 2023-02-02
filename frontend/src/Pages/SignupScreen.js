import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useNavigate } from 'react-router-dom'
import { useToasts } from "react-toast-notifications";
import {
  Form, Input,
} from 'antd';
const SignupScreen = () => {
  // for user context
  const uContext = useContext(UserContext)
  const { signup, user } = uContext

  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { addToast } = useToasts();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) navigate('/')
    //   eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSignup = () => {
    signup(userDetails.name, userDetails.email, userDetails.password, addToast)
  }

  return (
    <div>
      <div>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* Signup */ }
        <section id="Signup">
          <div className="container">
            <p className="text-center">
              Bạn có sẳn tài khoản chưa? <Link to="/login">Đăng Nhập</Link>
            </p>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Tài khoản đăng ký</h4>
                  </div>
                  <div className="card-body">
                    <Form form={ form }
                      onFinish={ handleSignup }>
                      <div className="form-group">
                        <Form.Item
                          name="name"
                          label="Tên"
                          rules={ [
                            {
                              min: 3,
                              message: 'Tên của bạn phải trên 3 kí tự',
                            },
                          ] }
                        >
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            value={ userDetails.name }
                            onChange={ handleChange } />
                        </Form.Item>
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={ [
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ] }
                        >
                          <Input
                            type="email"
                            name="email"
                            className="form-control"
                            value={ userDetails.email }
                            onChange={ handleChange } />
                        </Form.Item>
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="passwords"
                          label="Mật khẩu"
                          rules={ [
                            {
                              min: 6,
                              message: 'Mật khẩu của bạn phải trên 6 kí tự',
                            },
                          ] }
                        >
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            value={ userDetails.password }
                            onChange={ handleChange } />
                        </Form.Item>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Đăng ký
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SignupScreen
