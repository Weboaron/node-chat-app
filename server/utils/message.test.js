var expect = require('expect');

var {generateMessage} = require('./message');

describe('genreateMessage', ()=>{
  it('should generate correct message object',()=>{
  var from = 'Ofir Boaron';
  var text = 'Hello there'
  var msg = generateMessage(from,text)
  expect(msg.createdAt).toBeA('number')
  expect(msg.from).toBe(from)
  expect(msg.text).toBe(text)
})
})
