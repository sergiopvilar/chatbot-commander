class Commander {
  constructor(prefix = '!') {
    this.prefix = prefix;
    this.commands = [];
  }

  handle(string, attributes = {}) {
    this.commands.forEach((cmd) => {
      if (
        (cmd.input && string.startsWith(`${cmd.prefix}${cmd.command}`) && string !== `${cmd.prefix}${cmd.command}`) ||
        (!cmd.input & string.trim() === `${cmd.prefix}${cmd.command}`)
      ) {
        cmd.handler(string.replace(`${cmd.prefix}${cmd.command}`, '').trim(), attributes);
      }
    });
  }

  register(options, handler) {
    let {command, input, prefix} = options;

    if (typeof handler !== 'function') {
      throw new Error('Handler argument must be a function');
    }

    if (typeof command === 'undefined') {
      throw new Error('Command option is required');
    }

    if (typeof prefix === 'undefined') {
      prefix = this.prefix;
    }

    if (typeof input === 'undefined') {
      input = true;
    }

    if (options.mention && command !== '') {
      prefix = this.options.username;
      command = ` ${command}`;
      input = true;
    } else if (options.mention && command === '') {
      prefix = '';
      command = this.options.username;
      input = true;
    }

    this.commands.push({command, handler, input, prefix});
  }

}

export default Commander;
