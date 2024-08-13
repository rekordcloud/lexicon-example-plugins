// showInputDialog is an async function that waits for user input. Don't forget await.
const answer = await _ui.showInputDialog({
  input: 'text', // Defaults to 'text'
  message: 'What is your favorite genre?',  // Message to the user
  default: 'Techno', // Optional. Default input value
  settingsKey: 'Favorite Genre', // Optional. config.settings key so this value is stored automatically and can also be adjusted using the Settings UI button
  type: 'warning' // Optional. Type/color of popup. Can be: primary, success, info, warning, error
})

// Answer will be null if the popup was canceled
if (answer) {
  _helpers.Report(`You answered: ${answer}`)
}
