const { foo } = require('./index.js');

test('foo', () => {
  expect(foo()).toBe('bar');
});