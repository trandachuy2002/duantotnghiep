import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { useToasts } from "react-toast-notifications";
import {
  Form, Input,
} from 'antd';
const LoginScreen = () => {
  const [form] = Form.useForm();

  // for user context
  const uContext = useContext(UserContext)
  const { login, user } = uContext

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { addToast } = useToasts();

  useEffect(() => {
    if (user) navigate('/')
    //   eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    // e.preventDefault()

    login(credentials.email, credentials.password, addToast)
  }

  return (
    <div>
      <div>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* LOGIN */ }
        <section id="login">
          <div className="container">
            <p className="text-center">
              Không có tài khoản? <Link to="/signup">Đăng ký</Link> |
              <Link to="/forgotpassword"> Quên mật khẩu</Link>
            </p>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Đăng nhập tài khoản</h4>
                  </div>
                  <div className="card-body">
                    <Form form={ form }
                      onFinish={ handleLogin }>
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
                            value={ credentials.email }
                            onChange={ handleChange } />
                        </Form.Item>
                        {/* <label htmlFor="email">Email</label>
                        <input
                          onChange={ handleChange }
                          type="text"
                          className="form-control"
                          name="email"
                          value={ credentials.email }
                        /> */}
                      </div>
                      <div className="form-group">
                        <Form.Item
                          name="passwords"
                          label="Mật khẩu"
                        >
                          <Input
                            type="password"
                            name="password"
                            className="form-control"
                            value={ credentials.password }
                            onChange={ handleChange } />
                        </Form.Item>
                        {/* <label htmlFor="password">Mật khẩu</label>
                        <input
                          onChange={ handleChange }
                          type="password"
                          className="form-control"
                          name="password"
                          value={ credentials.password }
                        /> */}
                      </div>
                      <input
                        type="submit"
                        defaultValue="Login"
                        className="btn btn-primary btn-block"
                      />
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

export default LoginScreen
