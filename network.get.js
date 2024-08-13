const result = await _network.GET({
  url: 'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1',
  headers: { }
})

_helpers.Log('GET call result: ' + result)

// Now report our counts back to the user when plugin ends. We can call this multiple times, each for a new line.
_helpers.Report(`Your random number from the internet is: ${result[0]}`)

