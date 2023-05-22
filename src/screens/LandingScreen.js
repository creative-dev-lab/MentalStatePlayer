import React from 'react';
import { View, Text, Button } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const goToPlayer = (state) => {
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
