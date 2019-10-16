# Chatbot Commander

[![Build Status](https://travis-ci.org/sergiopvilar/chatbot-commander.svg?branch=master)](https://travis-ci.org/sergiopvilar/chatbot-commander)

A chatbot-commander module to handle strings and call the proper callbacks, particularly usefull for command oriented chatbots.

## How to use

At first don't forget to install the dependencies:

    yarn add chatbot-commander

Then import the module and start the fun:

```javascript
import ChatbotCommander from 'chatbot-commander'

const commander = new ChatbotCommander('!') // Set the command prefix to '!'

// Registers a command
commander.register({command: 'test'}, (input, attrs) => {
  console.log(input) // outputs 'foo'
})

commander.handle('!test foo')
```
