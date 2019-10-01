class Commander {

  constructor(prefix, options) {
    this.prefix = prefix
    this.commands = []
  }

  handle(string, attributes = {}) {
    for (var i in this.commands) {
      cmd = this.commands[i]
      if (
        cmd.input && message.content.startsWith(`${cmd.prefix}${cmd.command}`) ||
        !cmd.input & message.content.trim() == `${cmd.prefix}${cmd.command}`
      ) {
        cmd.handler(string.replace(`${cmd.prefix}${cmd.command}`, '').trim(), attributes)
        return
      }
    }
  }

  register(options, handler) {
    let { command, input, prefix } = options

    if(typeof handler !== 'function') throw new Error('Handler argument must be a function')
    if(typeof command === 'undefined') throw new Error('command option is required')
    if (typeof prefix === 'undefined') prefix = this.prefix
    if (typeof input === 'undefined') input = true

    if(options.mention && command !== '') {
      prefix = this.options.username
      command = ` ${command}`
      input = true
    } else if (options.mention && command === '') {
      prefix = ''
      command = this.options.username
      input = true
    }

    this.commands.push({
      command: command,
      handler: handler,
      input: input,
      prefix: prefix
    })
  }

}

module.exports = Commander
