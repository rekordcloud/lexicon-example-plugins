const categoryLabel = 'Development'
const tagLabel = _settings['Custom Tag Name']

// Check if the custom tag category already exists
let category = _vars.customTagCategories.find(x => x.label === categoryLabel)

if (!category) { // If not, create it
  category = await _library.customTagCategory.create({ label: categoryLabel, color: '#ff0000' }) // Color parameter is optional

  _helpers.Log(`Created a new Custom Tag category with label "${categoryLabel}" and ID ${category.id}`)
} else {
  _helpers.Log(`Custom Tag category with label "${categoryLabel}" already exists`)
}

// Check if the custom tag already exists
let tag = _vars.customTags.find(x => x.label === tagLabel)

if (!tag) { // If not, create it
  tag = await _library.customTag.create({ label: tagLabel, categoryId: category.id })

  _helpers.Log(`Created a new Custom Tag with label "${tagLabel}" and ID ${tag.id}`)
} else {
  _helpers.Log(`Custom Tag with label "${tagLabel}" already exists`)
}

let totalModified = 0

// Add the tag ID to each selected track
for (const track of _vars.tracksSelected) {
  if (!track.tags.includes(tag.id)) {
    track.tags.push(tag.id)

    totalModified += 1
  }
}

_helpers.Report(`Added Custom Tag "${tagLabel}" to ${totalModified} track(s)`)
