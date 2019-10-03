import assert from 'assert'
import Commander from '../src/index.js'

describe('Input command', () => {
  it('should call handler', (done) => {
    let commander = new Commander()
      , commandInput = 'this is a simple test'
      , commandAttr = {foo: 'bar'}

    commander.register({command: 'test'}, (input, attrs) => {
      assert.equal(input, commandInput)
      assert.equal(attrs, commandAttr)
      done()
    })
    commander.handle(`!test ${commandInput}`, commandAttr)
  })
})
