import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import API, {setBearerToken} from '../api';
import {RootStackParamList} from '../App';
import {ActivityIndicator, Button, Text} from 'react-native-paper';

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
  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: profileData,
    isLoading,
    isError,
  } = useQuery(['authenticated', 'profile'], async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await API.get('profile').then(response => response.data);
  });
  const logout = React.useCallback(() => {
    navigation.removeListener('beforeRemove', () => {});
    navigation.navigate('Signup');
    setBearerToken('');
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>You are logged in!</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : isError ? (
        <Text>There was error while loading data</Text>
      ) : (
        <View style={styles.itemContainer}>
          <Text>Name:</Text>
          <Text>{profileData?.email}</Text>
        </View>
      )}

      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
});
