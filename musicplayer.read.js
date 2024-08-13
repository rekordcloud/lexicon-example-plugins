console.log()

const nowPlaying = _musicplayer.getNowPlaying()

if (nowPlaying) {
  _helpers.Report(`The currently playing track is: ${nowPlaying.title} - ${nowPlaying.artist}`)
}

const queue = _musicplayer.getQueue()

if (queue.length === 0) {
  _helpers.Report(`There are no tracks in the queue`)
} else {
  _helpers.Report(`There are ${queue.length} track(s) in the queue`)
}
