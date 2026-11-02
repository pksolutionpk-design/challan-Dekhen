const p = { mock:require('./mock'), psca:require('./psca'), sindh:require('./sindh') };
module.exports = p[process.env.PROVIDER || 'mock'];
