const playlistName = _settings['Playlist Name']

if (!playlistName) {
  throw new Error(`Set a playlist name in the action settings`)
}

// Find our playlist including matches with a suffix like (12) because we're adding that ourselves
const regex = new RegExp(`^(${playlistName})( \\(\\d+\\))?$`)

const playlist = _vars.playlistsAll.find(x => regex.test(x.name))

if (!playlist) {
  throw new Error(`Could not find any playlist called "${playlistName}"`)
}

let count = 0

playlist.trackIds = await playlist.getTrackIds()

// Add all selected tracks to it
for (const track of _vars.tracksSelected) {
  if (!playlist.trackIds.includes(track.id)) {
    playlist.trackIds.push(track.id)

    count += 1
  }
}

const playlistNameWithoutSuffix = playlistName.match(regex)[1]

playlist.name = `${playlistNameWithoutSuffix} (${playlist.trackIds.length})`

_helpers.Report(`Added ${count} track(s) to "${playlistName}" and updated name`)
    