import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import ViewPosts from './screens/ViewPosts';
import AppNavigator from './screens/AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        
        <Stack.Screen name="AppNav" component={AppNavigator}  options={{headerShown:false}}/>
        
        
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="ViewPosts" component={ViewPosts}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
