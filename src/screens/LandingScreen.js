import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import TrackPlayer from '../components/TrackPlayer';

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
    }

    setupPlayer();
  }, []);

  const goToPlayer = async (state) => {
    navigation.navigate('Player', { state });
  };

  return (
    <View>
      <Text>Choose a mental state:</Text>
      <Button title="Focus" onPress={() => goToPlayer('focus')} />
      <Button title="Relax" onPress={() => goToPlayer('relax')} />
      <Button title="Sleep" onPress={() => goToPlayer('sleep')} />
    </View>
  );
};

export default LandingScreen;
