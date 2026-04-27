export const createError = (status, msg) => {
  const e = new Error(msg);
  e.status = status;
  return e;
};

export const handleError = (err, req, res, next) => {
  res.status(err.status ?? 500).json({ success: false, message: err.message ?? "Internal Server Error" });
};
