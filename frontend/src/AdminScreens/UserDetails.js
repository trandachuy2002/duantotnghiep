import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import Breadcrumb from '../components/Breadcrumb';
import UserContext from '../context/user/UserContext';

const UserDetails = ({ strings }) => {
  const uContext = useContext(UserContext)
  const { getOneUserAdmin } = uContext

  const { id } = useParams()

  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchUser = async () => {
      const result = await getOneUserAdmin(id)
      setUser(result)
    }
    fetchUser()
  }, [])

  return (
    <>
      <Breadcrumb pageName="User Details" />
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={ { borderRadius: '10px' } }>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    { strings["hello"] },
                    <span style={ { color: '#a8729a' } }>{ user.name }</span>!
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={ { color: '#a8729a' } }>
                      { strings["Receipt"] }
                    </p>
                    <p className="small text-muted mb-0">
                      { strings["user_id"] }: <b>{ id }</b>
                    </p>
                  </div>

                  {/* { user && user.map(u => ( */ }
                  <div
                    key={ user._id }
                    className="card shadow-0 border mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0">
                            <b>  { strings["first_and_last_name"] }: { user.name }</b>
                          </p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">
                            { strings["email"] }: { user.email }
                          </p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">
                            { strings["Role"] }: { user.role }
                          </p>
                        </div>
                      </div>
                      <hr
                        className="mb-4"
                        style={ { backgroundColor: '#e0e0e0', opacity: 1 } }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

};

export default multilanguage(UserDetails);