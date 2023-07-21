export const createError = (status, message) => {
  const err = new Error();
  err.status = status || 404;
  err.message = message || 'something wrong';
  return err;
};
