import http from 'http';
import https from 'https';

/**
 * Send a request to the given endpoint
 * @param {string} endpoint - The URL to send the request to
 * @param {string} method - The HTTP method to use
 * @param {string} body - The body of the request
 * @returns {Promise<string>} The response
 */
const request = async (endpoint: string, method: string, body: string) => {
  const url = new URL(endpoint);
  const opts = {
    auth: url.username + ':' + url.password,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    href: url.href,
    protocol: url.protocol,
    path: url.pathname + url.search,
    method: method
  };

  const server = opts.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = server.request(opts, (res) => {
      let strData = '';
      res.setEncoding('utf8');

      res.on('data', (d) => (strData += d));

      res.on('end', () => {
        // Return the full string
        if (res.statusCode === 200) {
          resolve(strData);
        } else {
          reject(strData ? strData : res);
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.setHeader('User-Agent', 'btc-rpc-client');

    if (body) req.write(body);

    req.end();
  });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post: (endpoint: string, body: string) => Promise<any> = async (
  endpoint: string,
  body: string
) => {
  return await request(endpoint, 'POST', body);
};
