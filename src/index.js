class Commander {

  constructor(prefix = '!', options) {
    this.prefix = prefix
    this.commands = []
  }

  handle(string, attributes = {}) {
    let cmd

    for (var i in this.commands) {
      cmd = this.commands[i]
      if (
        cmd.input && string.startsWith(`${cmd.prefix}${cmd.command}`) && string !== `${cmd.prefix}${cmd.command}` ||
        !cmd.input & string.trim() == `${cmd.prefix}${cmd.command}`
      ) {
        cmd.handler(string.replace(`${cmd.prefix}${cmd.command}`, '').trim(), attributes)
        return
      }
    }
  }

  register(options, handler) {
    let { command, input, prefix } = options

    if(typeof handler !== 'function') throw new Error('Handler argument must be a function')
    if(typeof command === 'undefined') throw new Error('Command option is required')
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
