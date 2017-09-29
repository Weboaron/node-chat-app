var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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


describe('genetateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from = 'ofir'
    var lat = 15
    var lan = 19
    url = 'https://www.google.com/maps?q=15,19'
    var res=generateLocationMessage(from,lat,lan);
    expect(res.createAt).toBeA('number')
    expect(res.form).toBe(from)
    expect(res.url).toBe(url)

  })
})
