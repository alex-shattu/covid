import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from 'navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState, StatusBar } from 'react-native';
import { focusManager } from 'react-query';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// need .env
axios.defaults.baseURL = 'https://api.covid19api.com';

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener('change', state => {
    handleFocus(state === 'active');
  });

  return () => {
    subscription.remove();
  };
});

const App: React.FC<{}> = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
