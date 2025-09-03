import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SetupPasswordScreen from '../screens/SetupPasswordScreen';
import AboutBusinessScreen from '../screens/AboutBusinessScreen';
import SelectCategoryScreen from '../screens/SelectCategoryScreen';
import TeamSizeScreen from '../screens/TeamSizeScreen';
import WorkLocationScreen from '../screens/WorkLocationScreen';
import AddressConfirmationScreen from '../screens/AddressConfirmationScreen';

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
        <Stack.Screen 
          name="SelectCategory" 
          component={SelectCategoryScreen}
          options={{ title: 'Select Category' }}
        />
        <Stack.Screen 
          name="TeamSize" 
          component={TeamSizeScreen}
          options={{ title: 'Team Size' }}
        />
        <Stack.Screen 
          name="WorkLocation" 
          component={WorkLocationScreen}
          options={{ title: 'Work Location' }}
        />
        <Stack.Screen 
          name="AddressConfirmation" 
          component={AddressConfirmationScreen}
          options={{ title: 'Address Confirmation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
