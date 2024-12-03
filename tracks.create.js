const tracks = await _library.track.create(['C:/Users/Chris/Music/The Prototypes - City of Gold3.mp3'])

if (!tracks || tracks.length === 0) {
  _helpers.Report(`No track was added, maybe the location does not exist or the track was already in your library?`)

  return
}

const trackId = tracks[0].id

let batch = await _library.track.getNextAllBatch()

let newTrackFromDatabase = null

while (batch.length > 0 && !newTrackFromDatabase) {
  for (const track of batch) {
    if (track.id === trackId) {
      newTrackFromDatabase = track
    }
  }

  batch = await _library.track.getNextAllBatch()
}

if (newTrackFromDatabase) {
  _helpers.Report(`Found the new track in your library: ${newTrackFromDatabase.title} - ${newTrackFromDatabase.artist}`)
} else {
  _helpers.Report(`Did not find the new track in your library!`)
}
