const emoji = _settings['Emoji']

for (const track of _vars.tracksSelected) {
  track.title += ` ${emoji}`
}

_helpers.Log(`Added ${emoji} to ${_vars.tracksSelected.length} track(s)`)
