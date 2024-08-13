const API_KEY = _settings['ChatGPT API Key']

if (!API_KEY) {
  throw new Error('Set your ChatGPT API key in the plugin settings')
}

let question = `I have a JSON array of song objects. Use the artist and title in each song object to find the correct album and release year for each song. Add the album and release year to the input JSON array and use the "albumTitle" and "year" keys. Only respond with the JSON array. Here is the input JSON array with songs:\n\n`

const validTracks = []

for (const track of _vars.tracksSelected) {
  if (track.artist && track.title) {
    validTracks.push({
      id: track.id,
      title: track.title,
      artist: track.artist
    })
  }
}

question += JSON.stringify(validTracks)

_helpers.Log(question)

const response = await _network.POST({
  url: 'https://api.openai.com/v1/chat/completions',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: question
      }
    ],
    model: 'gpt-3.5-turbo'
  }
})

const message = response.choices[0].message.content

_helpers.Log(message)

const outputTracks = JSON.parse(message)

for (const track of _vars.tracksSelected) {
  const outputTrack = outputTracks.find(x => x.id === track.id)

  if (outputTrack) {
    if (outputTrack.albumTitle) {
      track.albumTitle = outputTrack.albumTitle
    }

    if (outputTrack.year) {
      track.year = parseInt(outputTrack.year)
    }
  }
}
