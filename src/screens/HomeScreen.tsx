import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../App';

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: SignupScreenProps) {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation],
  );
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
