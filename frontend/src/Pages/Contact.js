import React from "react"
import { multilanguage } from "redux-multilanguage";
import Breadcrumb from "../components/Breadcrumb"

const Contact = ({ strings }) => {
  return (
    <>
      <Breadcrumb pageName="Contact" />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-3 text-black">{ strings["Send_contact_to_MEN4MEN"] }</h2>
            </div>
            <div className="col-md-7">
              <form action="#" method="post">
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        { strings["first_name"] } <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">
                        { strings["last_name"] } <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_lname"
                        name="c_lname"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">
                        { strings["email"] } <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="c_email"
                        name="c_email"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">
                        { strings["Content"] }
                      </label>
                      <textarea
                        name="c_message"
                        id="c_message"
                        cols="30"
                        rows="7"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        value={ strings["send_the_contact"] }
                      />
                    </div>
                  </div>
                </div>
              </form>
              <br></br>
            </div>
            <div className="col-md-5 ml-auto">
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  { strings["Address"] }
                </span>
                <p className="mb-0">
                  { strings["Building P, Quang Trung Software Park, District 12, Ho Chi Minh City"] }
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  { strings["phone"] }
                </span>
                <p className="mb-0">
                  +84 389 927 903
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  { strings["email"] }
                </span>
                <p className="mb-0">
                  duantotnghiep@domain.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default multilanguage(Contact);
