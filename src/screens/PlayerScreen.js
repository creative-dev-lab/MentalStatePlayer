import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import TrackPlayer from '../components/TrackPlayer';
import { Event, State } from 'react-native-track-player';

const PlayerScreen = ({ navigation, route }) => {
	const { state } = route.params;
	const [tracks, setTracks] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

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
			TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (data) => {
				if (data.nextTrack) {
					const track = await TrackPlayer.getTrack(data.nextTrack);
					setCurrentTrackIndex(data.nextTrack);
				}
			});

			TrackPlayer.addEventListener(Event.PlaybackState, async (data) => {
				const { state: playbackState } = data;

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
			TrackPlayer.reset();
		};
	}, [state]);

	useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      TrackPlayer.reset();
    });

    return unsubscribe;
  }, [navigation]);

	const handlePlayPause = async () => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack || currentTrack == 0) {
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
		const trackQueue = await TrackPlayer.getQueue();
		if (trackQueue.length > 0 && currentTrackIndex < tracks.length - 1) {
			await TrackPlayer.skipToNext();
		} else if (tracks.length > 0) {
			await TrackPlayer.reset();
			await TrackPlayer.add(tracks);
			await TrackPlayer.play();
			setCurrentTrackIndex(0);
		}
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<View>
			<Text>Mental State: {state}</Text>
			{tracks.length > 0 && <Text>Track: {tracks[currentTrackIndex].name}</Text>}
			<Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
			<Button title="Skip Next" onPress={handleSkipNext} />
			<Button title="Go Back" onPress={handleGoBack} />
		</View>
	);
};

export default PlayerScreen;
