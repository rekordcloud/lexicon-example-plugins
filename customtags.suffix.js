const emoji = _settings['Emoji']

let totalModified = 0

for (const tag of _vars.customTags) {
  if (!tag.label.endsWith(emoji)) {
    tag.label += ` ${emoji}`

    totalModified += 1
  }
}

_helpers.Report(`Added the ${emoji} emoji to ${totalModified} Custom Tag(s)`)
