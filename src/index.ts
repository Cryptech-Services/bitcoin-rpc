import * as NET from './net';

export default class RPC {
  private _id: number;
  /**
   * A Bitcoin RPC Client
   * @param {string} user - The RPC username
   * @param {string} pass - The RPC password
   * @param {string} host - The RPC host
   * @param {number} port - The RPC port
   * @example
   * new RPC('user', 'pass', '127.0.0.1', 8332);
   */
  constructor(
    private user: string,
    private pass: string,
    private host: string,
    private port: number
  ) {
    this._id = 0;
  }

  /**
   * Call an RPC method
   * @param args - the RPC method and its arguments
   *
   * This will return the exact `result` of the RPC output, which may be a `string` or a JSON `object`.
   * @returns {Promise<Object|string>} The result of the RPC call
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async call(method: string, ...args: any[]) {
    try {
      const request = {
        jsonrpc: '1.0',
        id: this._id++,
        method,
        params: [...args]
      };
      let res = JSON.parse(
        await NET.post(
          `http://${this.user}:${this.pass}@${this.host}:${this.port}`,
          JSON.stringify(request)
        )
      );
      // Result may be JSON or a string, so we'll attempt to parse JSON, but if it fails then it's fine too! It's a string
      try {
        res = JSON.parse(res.result);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        res = res.result;
      }
      return res;
    } catch (e) {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      throw (e as any).json ? (await (e as any).json()).error : e;
    }
  }
}
