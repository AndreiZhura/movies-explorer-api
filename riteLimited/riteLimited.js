const rateLimit = require('express-rate-limit');
// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 2 requests per windowMs
});

module.exports = {
  apiRequestLimiter,
};
