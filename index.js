const wait_port = require("wait-port");
const pinger = require('minecraft-pinger')

async function wait_for_server(host, port) {
  const params = {
    host, port,
  };
  await wait_port(params);
  async function ping_and_repeat_on_error() {
    console.log(`Pinging ${host}:${port}...`);
    await pinger.pingPromise(host, port).catch(async () => {
      console.log("Error while pinging, Retrying");
      await ping_and_repeat_on_error()
    }).then(() => console.log("Pinged successfully!"));
  }
  await ping_and_repeat_on_error();
}
module.exports = wait_for_server;
