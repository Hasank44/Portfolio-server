const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found'
      });
    };

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: ' You do not have permission'
      });
    };

    next();
  };
};

module.exports = roleMiddleware;
