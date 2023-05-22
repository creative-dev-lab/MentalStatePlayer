import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import TrackPlayer, { Event, State } from 'react-native-track-player';

const PlayerScreen = ({ navigation, route }) => {
	const { state } = route.params;
	const [tracks, setTracks] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const response = await fetch(`http://localhost:3000/tracks/${state}`);
				const data = await response.json();
				setTracks(data);
			} catch (error) {
				console.log('Error fetching tracks:', error);
			}
		};

		const initializePlayer = async () => {
			await TrackPlayer.setupPlayer();

			TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (data) => {
				if (data.nextTrack) {
					const track = await TrackPlayer.getTrack(data.nextTrack);
					console.log('Current track:', track);
					// Update the track information or perform any other necessary operations
				}
			});

			TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {
				const { state: playbackState } = data;
				console.log('Playback state:', playbackState);

				if (playbackState === State.Playing) {
					setIsPlaying(true);
				} else {
					setIsPlaying(false);
				}
			});
		};

		initializePlayer();
		fetchTracks();

		return () => {
			TrackPlayer.stop();
			TrackPlayer.reset();
			TrackPlayer.destroy();
		};
	}, [state]);

	const handlePlayPause = async () => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack) {
			const playerState = await TrackPlayer.getState();
			if (playerState === State.Playing) {
				await TrackPlayer.pause();
			} else {
				await TrackPlayer.play();
			}
		} else if (tracks.length > 0) {
			await TrackPlayer.reset();
			await TrackPlayer.add(tracks);
			await TrackPlayer.play();
		}
	};

	const handleSkipNext = async () => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack < tracks.length - 1) {
			await TrackPlayer.skipToNext();
		} else if (tracks.length > 0) {
			await TrackPlayer.reset();
			await TrackPlayer.add(tracks);
			await TrackPlayer.play();
		}
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View>
			<Text>Mental State: {state}</Text>
			{tracks.length > 0 && <Text>Track: {tracks[0].name}</Text>}
			<Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
			<Button title="Skip Next" onPress={handleSkipNext} />
			<Button title="Go Back" onPress={handleGoBack} />
		</View>
	);
};

export default PlayerScreen;
