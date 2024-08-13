const CUE_AMOUNT = 8
const firstSelectedTrack = _vars.tracksSelected[0]

if (firstSelectedTrack) {
  _ui.control('MusicPlayer_Load', { id: firstSelectedTrack.id })

  await _helpers.Wait(1000)

  _ui.control('MusicPlayer_TempomarkerFind')
  _ui.control('MusicPlayer_Play')

  for (let index = 0; index < CUE_AMOUNT; index++) {
    _ui.control('MusicPlayer_CreateHotcue', { index: index })
    
    if (index < CUE_AMOUNT - 1) {
      await _helpers.Wait(60 / _musicplayer.getBpm() * 1000 * 4)
    }
  }
}
