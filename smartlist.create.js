const smartlistFolderName = 'Example Smartlists'

let smartlistFolder = _vars.playlistsAll.find(x => x.name === smartlistFolderName)

if (!smartlistFolder) {
  smartlistFolder = await _library.playlist.create({
    name: smartlistFolderName,
    parentId: null, // No parent, top level playlist folder
    type: '1' // Folder
  })
}

// Smartlist with rule: StringContains
const smartlist1 = await _library.playlist.create({
  name: "Artist Contains Andy",
  parentId: smartlistFolder.id,
  type: '3', // Smartlist
  smartlist: { // The smartlist object
    matchAll: true, // Match any/all rule
    rules: [
      {
        field: 'artist', // For all available fields and operators, see the developer API docs: ...
        operator: 'StringContains',
        values: [
          'andy'
        ]
      }
    ]
  }
})

_helpers.Report(`The StringContains smartlist contains ${(await smartlist1.getTrackIds()).length} track(s)`)

// Smartlist with rule: TagsAtleastOne
const smartlist2 = await _library.playlist.create({
  name: "Has Custom Tags",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'tags',
        operator: 'TagsAtleastOne',
        values: [
          _vars.customTags.slice(0, 10).map(x => x.id)
        ]
      }
    ]
  }
})

_helpers.Report(`The TagsAtleastOne smartlist contains ${(await smartlist2.getTrackIds()).length} track(s)`)

// Smartlist with rule: DateAfter
const smartlist3 = await _library.playlist.create({
  name: "Added This Year",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'dateAdded',
        operator: 'DateAfter',
        values: [
          new Date('2024-01-01')
        ]
      }
    ]
  }
})

_helpers.Report(`The DateAfter smartlist contains ${(await smartlist3.getTrackIds()).length} track(s)`)

// Smartlist with rule: NumberBetween
const smartlist4 = await _library.playlist.create({
  name: "BPM 120-130",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'bpm',
        operator: 'NumberBetween',
        values: [
          120,
          130
        ]
      }
    ]
  }
})

_helpers.Report(`The NumberBetween smartlist contains ${(await smartlist4.getTrackIds()).length} track(s)`)

// Smartlist with rule: Exists
const smartlist5 = await _library.playlist.create({
  name: "Comment Exists",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'comment',
        operator: 'Exists',
        values: []
      }
    ]
  }
})

_helpers.Report(`The Exists smartlist contains ${(await smartlist5.getTrackIds()).length} track(s)`)

// Smartlist with rule: CuepointAnyColorEquals
const smartlist6 = await _library.playlist.create({
  name: "Has Any Red Cue",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'cuepoints',
        operator: 'CuepointAnyColorEquals',
        values: [
          'red' // For all available colors, see the API developer documentation
        ]
      }
    ]
  }
})

_helpers.Report(`The CuepointAnyColorEquals smartlist contains ${(await smartlist6.getTrackIds()).length} track(s)`)

// Smartlist with rule: PlaylistInSpecificSmartlist
const smartlist7 = await _library.playlist.create({
  name: "In Another Smartlist",
  parentId: smartlistFolder.id,
  type: '3',
  smartlist: {
    matchAll: true,
    rules: [
      {
        field: 'Playlist',
        operator: 'PlaylistInSpecificSmartlist',
        values: [
          // Playlists are referred to by their path, this makes sure smartlists don't break when re-importing playlists that may have new IDs.
          // The playlist path uses special characters to prevent collisions with actual playlist names.
          // The path is created like this:
          // 1. Each folder is separated by %%
          // 2. The path is suffixed by %!#!% following the ID of the targeted playlist. This is to prevent confusion with identical playlist names.
          // The following is an example of a playlist like this: "Example Plugins/Artist Contains Andy" which turns into: "Example Plugins%%Artist Contains Andy%!#!%1234"
          `${smartlistFolderName}%%${smartlist1.name}%!#!%${smartlist1.id}`
        ]
      }
    ]
  }
})

_helpers.Report(`The PlaylistInSpecificSmartlist smartlist contains ${(await smartlist7.getTrackIds()).length} track(s)`)
