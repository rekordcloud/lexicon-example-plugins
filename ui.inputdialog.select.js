// showInputDialog is an async function that waits for user input. Don't forget await.
const answer = await _ui.showInputDialog({
  input: 'select', // Show a select dropdown
  message: 'What is your favorite genre?',  // Message to the user
  // default: 'Techno', // Optional. Default input value
  options: [
    'Techno',
    'Drum & Bass',
    'House',
    'Something else'
  ],
  // settingsKey: 'Favorite Genre', // Optional. config.settings key so this value is stored automatically and can also be adjusted using the Settings UI button
  type: 'success' // Optional. Type/color of popup. Can be: primary, success, info, warning, error
})

// Answer will be null if the popup was canceled
if (answer) {
  _helpers.Report(`You answered: ${answer}`)
}
