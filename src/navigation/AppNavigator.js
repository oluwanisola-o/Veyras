import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SetupPasswordScreen from '../screens/SetupPasswordScreen';
import AboutBusinessScreen from '../screens/AboutBusinessScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateAccount"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="SetupPassword" 
          component={SetupPasswordScreen}
          options={{ title: 'Setup Password' }}
        />
        <Stack.Screen 
          name="AboutBusiness" 
          component={AboutBusinessScreen}
          options={{ title: 'About Your Business' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
