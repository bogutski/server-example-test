const message = {};

message.success = (text = '', payload) => ({
  message: text,
  success: true,
  fail: false,
  payload,
});

message.fail = (text = '', payload) => ({
  message: text,
  success: false,
  fail: true,
  payload,
});

export default message;
