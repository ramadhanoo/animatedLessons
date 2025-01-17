import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screen/Home';
import Splash from './screen/Splash';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} options={{
         headerShown: false
      }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
