// Take the artist we want from the action settings
const artistSearch = _settings['Artist']

// Search the track library. This uses the same parameters as the /search/tracks API endpoint. See https://www.lexicondj.com/docs/developers#/Tracks/get_search_tracks
const tracks = _library.track.search({
  fields: ['title', 'artist', 'albumTitle'], // Only load these fields, this speeds things up
  filter: {
    artist: artistSearch // This is the actual search parameter
  }
})

_helpers.Report(`Found ${tracks.length} from artist ${artistSearch}:`)

for (const track of tracks) {
  _helpers.Report(`${track.title} - ${track.artist}`)
}

