const tracksWithLowEnergy = []

let batch = await _library.track.getNextAllBatch()

while (batch.length > 0) {
  for (const track of batch) {
    if (track.energy === 1) {
      tracksWithLowEnergy.push(track)
    }
  }

  batch = await _library.track.getNextAllBatch()
}

_helpers.Log(`Found ${tracksWithLowEnergy.length} track(s) with low energy`)

for (const track of tracksWithLowEnergy) {
  _library.track.delete(track)
}

_helpers.Report(`Deleted ${tracksWithLowEnergy.length} track(s) with low energy`)
