# Mental State Player App

A simple music player app built with React Native that allows you to play and control music tracks. The app uses the TrackPlayer library for audio playback and provides features like playing, pausing, skipping to the next track, and displaying track information.

## Features

- Play and pause music tracks
- Skip to the next track
- Display track information
- Fetch tracks from a remote server
- Handle back button navigation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/creative-dev-lab/MentalStatePlayer.git
   
2. Navigate to the project directory:

   ```bash
   cd MentalStatePlayer

3. Install the dependencies:

   ```bash
   npm install && cd ios && pod install && cd ..

4. Start the backend server:

   ```bash
   node server/server.js

5. Start the app:

   ```bash
   npx react-native start

This will start the Metro Bundler. You can then run the app on an Android or iOS emulator, or on a physical device.


## Usage
1. Launch the app on your device or emulator.
2. Select a mental state from the provided options.
3. The app will fetch the corresponding music tracks from the server and display the first track's information.
4. Use the provided controls to play/pause the track and skip to the next track.
5. The track information will update automatically when a new track starts playing.
6. Tap the back button on the navigation bar to go back to the previous screen.
