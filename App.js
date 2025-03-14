// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeetCodeScreen from './src/screens/LeetCodeScreen';
import CodeChefScreen from './src/screens/CodeChefScreen';
import CodeforcesScreen from './src/screens/CodeForcesScreen';
import { registerForPushNotificationsAsync } from './src/services/NotificationService';
import { LogBox, Image } from 'react-native';
import './global.css';

// Optionally ignore some warnings (e.g., timer warnings)
LogBox.ignoreLogs(['Setting a timer']);

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Hides the header on all screens
          tabBarShowLabel: false, // Hide labels and show icons only
          tabBarIcon: ({ color, size }) => {
            let iconSource;
            if (route.name === 'LeetCode') {
              iconSource = require('./assets/icons/leetcode.webp');
            } else if (route.name === 'CodeChef') {
              iconSource = require('./assets/icons/codechef.png');
            } else if (route.name === 'Codeforces') {
              iconSource = require('./assets/icons/codeforces.webp');
            }
            return (
              <Image
                source={iconSource}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="LeetCode" component={LeetCodeScreen} />
        <Tab.Screen name="CodeChef" component={CodeChefScreen} />
        <Tab.Screen name="Codeforces" component={CodeforcesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}