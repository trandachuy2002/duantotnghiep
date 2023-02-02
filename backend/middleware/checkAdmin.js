exports.checkAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      throw new Error()
    }
  } catch (err) {
    res
      .status(401)
      .json({ success: false, error: 'Không được ủy quyền với tư cách là quản trị viên!' })
  }
}

// export default checkAdmin
