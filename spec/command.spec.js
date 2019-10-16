import assert from 'assert';
import Commander from '../src/index';

describe('Commander', () => {

  describe('Throwing Errors', () => {
    it('should throw an error if a command is not specified', () => {
      const commander = new Commander();

      assert.throws(() => commander.register({}, (attr) => attr), Error, 'Command option is required');
    });

    it('should throw an error if a handler is not specified', () => {
      const commander = new Commander();

      assert.throws(() => commander.register({
        command: 'test',
      }), Error, 'Handler argument must be a function');
    });

    it('should throw an error if a handler is not a function', () => {
      const commander = new Commander();

      assert.throws(() => commander.register({
        command: 'test',
      }, {}), Error, 'Handler argument must be a function');
    });
  });

  describe('Handling Inputs', () => {
    it('should call handler if input is specified', (done) => {
      const commander = new Commander();
      const commandInput = 'this is a simple test';
      const commandAttr = {
        foo: 'bar',
      };

      commander.register({
        command: 'test',
      }, (input, attrs) => {
        assert.equal(input, commandInput);
        assert.equal(attrs, commandAttr);
        done();
      });
      commander.handle(`!test ${commandInput}`, commandAttr);
    });

    it('should call handler if input is not specified', (done) => {
      const commander = new Commander();
      const commandAttr = {
        foo: 'bar',
      };

      commander.register({
        command: 'test',
        input: false,
      }, (input, attrs) => {
        assert.equal(input, '');
        assert.equal(attrs, commandAttr);
        done();
      });
      commander.handle('!test', commandAttr);
    });

    it('should not call handler if input is not specified', () => {
      const commander = new Commander();

      commander.register({
        command: 'test',
      }, () => {
        throw new Error('Must not call handler');
      });
      commander.handle('!test');
    }).timeout(1000);

    it('should not call handler if input proviced but input options is set to false', () => {
      const commander = new Commander();

      commander.register({
        command: 'test',
        input: false,
      }, () => {
        throw new Error('Must not call handler');
      });

      commander.handle('!test argument');
    }).timeout(1000);
  });

  describe('Handling Prefixes', () => {
    it('should handle custom prefixes', (done) => {
      const commander = new Commander('?');

      commander.register({
        command: 'test',
        input: false,
      }, (input) => {
        assert.equal(input, '');
        done();
      });

      commander.handle(`?test`);
    });

    it('should call handler if prefix is empty and input and command are provided', (done) => {
      const commander = new Commander('');
      const commandInput = 'this is a simple test';
      const commandAttr = {
        foo: 'bar',
      };

      commander.register({
        command: 'test',
      }, (input, attrs) => {
        assert.equal(input, commandInput);
        assert.equal(attrs, commandAttr);
        done();
      });
      commander.handle(`test ${commandInput}`, commandAttr);
    });

    it('should call handler if prefix and input are empty but command is provided', (done) => {
      const commander = new Commander('');
      const commandAttr = {
        foo: 'bar',
      };

      commander.register({
        command: 'test',
        input: false,
      }, (input, attrs) => {
        assert.equal(attrs, commandAttr);
        done();
      });
      commander.handle(`test`, commandAttr);
    });
  });

});
