const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100 // giới hạn 100 request từ mỗi IP
});

module.exports = limiter;