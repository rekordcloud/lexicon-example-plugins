const playlistName = _settings['Playlist Name']

_helpers.Log(`Going to delete any playlist called "${playlistName}"`)

let count = 0

for (let i = 0; i < _vars.playlistsAll.length; i++) {
  const playlist = _vars.playlistsAll[i]

  if (playlist.name === playlistName) {
    _library.playlist.delete(playlist)

    _helpers.Log(`Found a playlist and deleted it!`)

    count += 1
  }
}

_helpers.Report(`Deleted ${count} playlist(s) with the name "${playlistName}"`)
