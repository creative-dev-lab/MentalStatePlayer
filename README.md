# senior full stack engineer coding challenge (mobile)

## mini brain.fm

### instructions
* create a react native app with two screens.
* the landing screen is a menu that lets you choose whether to "focus", "relax", or "sleep". (these are called "mental states").
* the second screen is an audio player that has the following properties:
  * i see a play/pause button that indicates the current state of the player.
  * i see an indicator as to which "mental state" i am in.
  * i see the name of the currently playing track.
  * a skip button that takes me to the next track.
  * i can go back to the landing screen.

### notes
* you do not need to setup a database, in memory is totally acceptable for all backend functionality.
* you can use any and all tooling/frameworks for this.

### requirements
* track urls must not be hardcoded in the front end. a server must be created to tell the front end what mp3s are eligible to be played for a given mental state.
  * example server: `get /tracks/focus`, `get /tracks/relax`, ...etc.
* tracks must be served not bundled in application.
* you must use git to commit your work. use the same messaging, and commit sizes you would use for work.
* make sure to include a readme with directions on how to get your project up and running.

### assets
* three mp3s have been provided for each mental state. you can use those as the audio files in this project.

### submission
* when you are done, please zip up the folder and e-mail to d.phillips@brain.fm.
* make sure to include your `.git` folder in the zip file!
