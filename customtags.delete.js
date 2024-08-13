const tagLabel = _settings['Custom Tag Name']

// Find the custom tag
let tag = _vars.customTags.find(x => x.label === tagLabel)

if (tag) {
  _library.customTag.delete(tag)

  _helpers.Log(`Deleted Custom Tag with label "${tagLabel}"`)
} else {
  _helpers.Log(`Could not find Custom Tag with label "${tagLabel}"`)
}
