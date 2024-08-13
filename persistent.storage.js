const STORAGE_KEY = 'amountRun'

// Store any variable in the Lexicon database. Each plugin action has a record for each storage key, so there is no chance of conflicting keys.
let amountRun = _storage.load(STORAGE_KEY)

if (amountRun === null) {
  amountRun = 0
}

amountRun += 1

// You can save any variable that can be serialized, even objects.
_storage.save(STORAGE_KEY, amountRun)

_helpers.Report(`This plugin action has been run ${amountRun} times`)
