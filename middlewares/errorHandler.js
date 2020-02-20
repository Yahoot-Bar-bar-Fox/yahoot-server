module.exports = (req, res, next) => {
  status = 500
  errObj = {
    msg: 'internal server error'
  }

  res.status(status).json(errObj)
}
