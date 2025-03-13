// src/services/NotificationService.js
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for notifications!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

export async function scheduleContestNotification(contestName, startTime) {
  // Reminder 12 hours before contest start
  const reminder12h = new Date(startTime.getTime() - 12 * 60 * 60 * 1000);
  // Reminder 30 minutes before contest start
  const reminder30m = new Date(startTime.getTime() - 30 * 60 * 1000);

  if (reminder12h > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `⏰ ${contestName} Reminder`,
        body: `Your contest starts in 12 hours. Prepare yourself!`,
      },
      trigger: reminder12h,
    });
  }
  if (reminder30m > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🚨 ${contestName} Starting Soon!`,
        body: `Only 30 minutes left. Get ready and join now!`,
      },
      trigger: reminder30m,
    });
  }
}