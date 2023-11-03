import { NavigationContainer } from '@react-navigation/native';
import HomeScreens from './screens/HomeScreens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreens} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </>
  );
}

