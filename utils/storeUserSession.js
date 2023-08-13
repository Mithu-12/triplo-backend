const storeUserInSession = (req, res, next) => {
    if (req.user) {
      req.session.user = req.user;
    }
    next();
  };
  
export default storeUserInSession;