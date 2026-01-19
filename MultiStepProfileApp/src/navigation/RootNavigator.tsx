import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import HomeScreen from '../screens/HomeScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import AddressInfoScreen from '../screens/AddressInfoScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'User Profiles' }}
        />
        <Stack.Screen
          name="BasicInfo"
          component={BasicInfoScreen}
          options={{ title: 'Step 1: Basic Information' }}
        />
        <Stack.Screen
          name="AddressInfo"
          component={AddressInfoScreen}
          options={{ title: 'Step 2: Address Information' }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: 'Step 3: Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
