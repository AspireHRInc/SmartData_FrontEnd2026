const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https' + '://' + 'xgwuaf9642.execute-api.us-east-2.amazonaws.com',
    secure: true,
    changeOrigin: true,
    pathRewrite: { '^/api': '/test' },
    onProxyReq: function(proxyReq, req, res) {
      if (req.headers['partition']) {
        proxyReq.setHeader('Partition', req.headers['partition']);
      }
      if (req.headers['query']) {
        proxyReq.setHeader('Query', req.headers['query']);
      }
      if (req.headers['lastmodifiedcached']) {
        proxyReq.setHeader('LastModifiedCached', req.headers['lastmodifiedcached']);
      }
      console.log('Proxying:', req.method, req.url);
      console.log('Partition header:', req.headers['partition']);
    }
  }
];

module.exports = PROXY_CONFIG;
