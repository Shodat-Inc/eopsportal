const sendResponseData = (success, message, data) => {
  return {
    success,
    message,
    data,
  };
};
export default sendResponseData;
