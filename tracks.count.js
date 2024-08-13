let totalTracks = 0
let selectedTracks = 0

// Get your library in batches so we don't get crazy memory usage. There are users with a million tracks, Lexicon can't hold all that in memory.
let batch = await _library.track.getNextAllBatch()

while (batch.length > 0) {
  totalTracks += batch.length

  batch = await _library.track.getNextAllBatch()
}

_helpers.Log('Total tracks: ' + totalTracks)

// Selected tracks aren't usually so many so we have an array of them all, no need for the batching
for (const track of _vars.tracksSelected) {
  selectedTracks += 1
}

_helpers.Log('Selected tracks: ' + selectedTracks)

// Now report our counts back to the user when plugin ends. We can call this multiple times, each for a new line.
_helpers.Report(`Your library has ${totalTracks} total track(s)`)
_helpers.Report(`You have selected ${selectedTracks} track(s)`)

