const os = require('os')
const StatsD = require('node-statsd')

const prefix = process.env.PREFIX
if (!prefix) {
  throw new Error('env PREFIX is required')
}
const client = new StatsD({
  host: '120.25.92.210',
  port: 8125,
  prefix: prefix + '.'
});

exec()
setInterval(exec, 10 * 1000)

function exec() {
  const freemen = os.freemem()
  const loadavgs = os.loadavg()

  client.gauge('loadavg', loadavgs[0])
  client.gauge('freemen', freemen)
}
