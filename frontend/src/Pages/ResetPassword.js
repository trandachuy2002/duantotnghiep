import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import { useToasts } from "react-toast-notifications";

const ResetPassword = () => {
  const uContext = useContext(UserContext)
  const { resetPassword } = uContext
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const payload = { password, confirmPassword }

    resetPassword(token, payload, addToast);
    navigate('/login')
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
          <p className="text-center">
            Don't have an accout? <Link to="/signup">Đăng Nhập</Link>
          </p>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Quên mật khẩu</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={ resetPasswordSubmit }>
                    <div className="form-group">
                      <label htmlFor="password">Mật khẩu mới</label>
                      <input
                        onChange={ (e) => setPassword(e.target.value) }
                        type="password"
                        className="form-control"
                        name="password"
                        value={ password }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Nhập mật khẩu mới</label>
                      <input
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={ confirmPassword }
                      />
                    </div>
                    <input
                      type="submit"
                      defaultValue="ForgotPassword"
                      className="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;