import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from 'screens/MainScreen';
import { CountriesScreen } from 'screens/CountriesScreen';

export type RootStackParamList = {
  Main: undefined;
  Countries: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator defaultScreenOptions={{ headerTransparent: true }}>
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainScreen}
      />
      <RootStack.Screen
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
          headerBackTitle: '',
        }}
        name="Countries"
        component={CountriesScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
