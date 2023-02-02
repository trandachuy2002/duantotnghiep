import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import { useToasts } from "react-toast-notifications";
import { Form, Input } from 'antd';

const UpdatePassword = () => {
  const [form] = Form.useForm();

  const uContext = useContext(UserContext);
  const { updatePassword } = uContext;
  const { addToast } = useToasts();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = () => {

    const payload = { oldPassword, newPassword, confirmPassword };
    updatePassword(payload, addToast);
  };

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
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Đổi mật khẩu</h4>
                </div>
                <div className="card-body">
                  <Form form={ form }
                    onFinish={ updatePasswordSubmit }>
                    <div className="form-group">
                      <Form.Item
                        name="passwords"
                        label="Mật khẩu cũ"
                        rules={ [
                          {
                            min: 6,
                            message: 'Mật khẩu của bạn phải lớn hơn 6 kí tự!',
                          },
                          {
                            required: true,
                            message: 'Bạn chưa nhập mật khẩu!',
                          },
                        ] }
                      >
                        <Input
                          type="password"
                          className="form-control"
                          value={ oldPassword }
                          onChange={ (e) => setOldPassword(e.target.value) }
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={ [
                          {
                            min: 6,
                            message: 'Mật khẩu của bạn phải lớn hơn 6 kí tự',
                          },
                          {
                            required: true,
                            message: 'Bạn chưa nhập mật khẩu mới!',
                          },
                        ] }
                      >
                        <Input
                          type="password"
                          className="form-control"
                          value={ newPassword }
                          onChange={ (e) => setNewPassword(e.target.value) }
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        name="confirmPassword"
                        label="Nhập mật khẩu mới"
                        rules={ [
                          {
                            min: 6,
                            message: 'Mật khẩu của bạn phải lớn hơn 6 kí tự',
                          },
                          {
                            required: true,
                            message: 'Bạn chưa nhập lại mật khẩu mới!',
                          },
                        ] }
                      >
                        <Input
                          type="password"
                          className="form-control"
                          value={ confirmPassword }
                          onChange={ (e) => setConfirmPassword(e.target.value) }
                        />
                      </Form.Item>
                    </div>

                    <Input
                      type="submit"
                      defaultValue="Đổi mật khẩu"
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

export default UpdatePassword;