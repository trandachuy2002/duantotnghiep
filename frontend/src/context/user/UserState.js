import UserContext from './UserContext'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

const UserState = props => {
  //fort navigate
  const navigate = useNavigate()

  // axios config
  const userToken = JSON.parse(localStorage.getItem('userToken'))
  const headers = {
    Authorization: `Bearer ${userToken || ''}`,
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [user, setUser] = useState(userInfo || null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  //   for disabling the alert messages after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {

      setUserError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setUserError({
        variant: 'danger',
        message: `${info} No response from server`,
      })
    } else {
      setUserError({ variant: 'danger', message: err.message })
    }
    setUserLoading(false)
  }

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password, addToast) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/login`, {
        email,
        password,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      // setUserMessage({ variant: 'success', message: 'Đăng nhập thành công' })
      navigate('/')
      if (addToast) {
        addToast("Đăng nhập thành công", { appearance: "success", autoDismiss: true });
      }
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  }

  // -----------------------------------------------------------------
  // Signup a new user
  // -----------------------------------------------------------------
  const signup = async (name, email, password, addToast) => {
    try {
      const body = clean({ name, email, password })
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      if (addToast) {
        addToast("Đăng ký thành công", { appearance: "success", autoDismiss: true });
      }
      navigate('/')
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  }

  // -----------------------------------------------------------------
  // Logout a user
  // -----------------------------------------------------------------
  const logout = async (items, addToast) => {

    try {
      setUserLoading(true)
      // await axios.post(`api/users/logout`, null, {
      //   headers,
      // })
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.removeItem('react-use-cart')

      setUser(null)
      setUserError(null)
      setUserLoading(false)
      // setUserMessage({ variant: 'dark', message: 'Bạn đã đăng xuất!' })
      if (addToast) {
        addToast("Đăng xuất thành công", { appearance: "success", autoDismiss: true });
      }

      navigate('/login')

    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  }

  // -----------------------------------------------------------------
  // Read user profile
  // -----------------------------------------------------------------
  const readProfile = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('api/users/profile', { headers })
      setUserError(null)
      setUserLoading(false)
      return data
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setUserLoading(false)
        });
    }
  }

  // -----------------------------------------------------------------
  // Edit Profile
  // -----------------------------------------------------------------
  const editProfile = async (payload, addToast) => {
    try {
      setUserLoading(true)
      if (payload.name === "") {
        addToast("bạn chưa nhập tên", { appearance: "error", autoDismiss: true });
        setUserLoading(false)
      }
      const { data } = await axios.patch('api/users/profile', payload, { headers })
      setUser(data.user)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      setUserError(null)
      setUserLoading(false)
      if (addToast) {
        addToast("Hồ sơ của bạn đã được cập nhật thành công", { appearance: "success", autoDismiss: true });
      }
      return data
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  }

  // -----------------------------------------------------------------
  // Get all users
  // -----------------------------------------------------------------
  const getAllUsers = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('/api/users/getAll', { headers })
      setAllUsers(data.users)
      setUserError(null)
      setUserLoading(false)
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setUserLoading(false)
        });
    }
  }

  // -----------------------------------------------------------------
  // Delete Profile
  // -----------------------------------------------------------------
  const deleteProfile = async () => {
    try {
      setUserLoading(false)
      await axios.delete('api/users/me', { headers })
      localStorage.removeItem('userInfo')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'danger', message: 'Đã xóa hồ sơ' })
      navigate('/login')
    } catch (err) {
      errorHandler(err)
    }
  }

  const getOneUserAdmin = async id => {
    try {
      setUserLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get(`/api/users/admin/user/${id}`, {
        headers,
      })
      setUserLoading(false)
      setUserError(null)
      return data.user
    } catch (err) {
      swal({
        title: `${err.response.data.error}`,
        icon: "error",
        button: "Ok",
      })
        .then((value) => {
          window.location.reload()
          setUserLoading(false)
        });
    }
  }
  const forgotPassword = async (payload, addToast) => {
    try {
      setUserLoading(true)
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post("/api/users/password/forgot", {
        email: payload.email
      },
        config
      );
      setUserLoading(false)
      setUserError(null)
      // setUserMessage({
      //   variant: 'success',
      //   message: `${data.message}`,
      // })
      if (addToast) {
        addToast(`${data.message}`, { appearance: "success", autoDismiss: true });
      }
      // return data.user;
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  };

  const resetPassword = async (token, payload, addToast) => {
    try {
      setUserLoading(true)

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/users/password/reset/${token}`,
        {
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        },
        config
      );

      setUserLoading(false)
      setUserError(null)
      if (addToast) {
        addToast("Bạn đã đổi mật khẩu thành công!", { appearance: "success", autoDismiss: true });
      }
      return data.user;

    } catch (error) {
      if (addToast) {
        addToast(`${error.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  };

  const updatePassword = async (payload, addToast) => {
    try {
      // setUserLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken && userToken}`,
        }
      };
      const body = clean({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      })

      const { data } = await axios.put(
        `api/users/profile/updatepassword`,
        body,
        config
      );
      if (addToast) {
        addToast("Đổi mật khẩu thành công!", { appearance: "success", autoDismiss: true });
        setTimeout(() => {
          navigate("/profile")
        }, 2000)
      }
      setUserLoading(false)
      setUserError(null)

      return data.user;
    } catch (err) {
      if (addToast) {
        addToast(`${err.response.data.error}`, { appearance: "error", autoDismiss: true });
      }
      setUserLoading(false)
    }
  };

  return (
    <UserContext.Provider
      value={ {
        user,
        userError,
        userLoading,
        userMessage,
        allUsers,
        login,
        signup,
        logout,
        readProfile,
        editProfile,
        getAllUsers,
        deleteProfile,
        getOneUserAdmin,
        forgotPassword,
        resetPassword,
        updatePassword
      } }>
      { props.children }
    </UserContext.Provider>
  )
}
// -----------------------------------------
//  Get One user admin
//   ---------------------------------------


export default UserState
