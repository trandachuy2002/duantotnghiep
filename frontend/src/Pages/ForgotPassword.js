import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import { useToasts } from "react-toast-notifications";
import {
  Form, Input,
} from 'antd';
const ForgotPassword = () => {
  const [form] = Form.useForm();

  const uContext = useContext(UserContext)
  const { forgotPassword } = uContext

  const [email, setEmail] = useState("")
  const { addToast } = useToasts();

  const handleForgotPassword = () => {
    // e.preventDefault()
    const payload = { email }
    forgotPassword(payload, addToast);
  }

  return (
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
            Don't have an accout? <Link to="/signup">Đăng ký</Link> |
            <Link to="/login"> Đăng nhập</Link>
          </p>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Forgot Password</h4>
                </div>
                <div className="card-body">
                  <Form
                    form={ form }
                    onFinish={ handleForgotPassword }>
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
                          value={ email }
                          onChange={ (e) => setEmail(e.target.value) } />
                      </Form.Item>
                      {/* <label htmlFor="email">Email</label>
                      <input
                        onChange={ (e) => setEmail(e.target.value) }
                        type="text"
                        className="form-control"
                        name="email"
                        value={ email }
                      /> */}
                    </div>
                    <input
                      type="submit"
                      defaultValue="ForgotPassword"
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
  );
};

export default ForgotPassword;