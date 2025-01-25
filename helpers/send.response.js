const sendResponse = (
  res,
  statusCode,
  data = {},
  error = false,
  message = ""
) => {
  res.status(statusCode).json({ data, error, message });
};

export default sendResponse;
