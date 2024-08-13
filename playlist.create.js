const newPlaylistName = 'My Awesome Playlist'

const pluginFolderResult = await _library.playlist.create({
  name: 'Plugin Folder', // Playlist name
  parentId: null, // No parentId, so this folder will be in the root
  type: '1' // Folder (1=Folder, 2=Playlist, 3=Smartlist)
})

const playlistResult = await _library.playlist.create({
  name: newPlaylistName,
  parentId: pluginFolderResult.id, // Put this playlist inside our Plugin Folder
  type: '2' // Normal playlist
})

// Find our new playlist
const playlist = _vars.playlistsAll.find(x => x.id === playlistResult.id)

// Add all selected tracks to it
playlist.trackIds = _vars.tracksSelected.map(x => x.id)

_helpers.Report(`Created playlist ${newPlaylistName} and aded ${playlist.trackIds.length} track(s) to it`)
