// src/screens/CodeChefScreen.js
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import ContestCard from '../components/ContestCard';
import { scheduleContestNotification } from '../services/NotificationService';

const getNextCodeChefContest = () => {
  const now = new Date();
  const result = new Date(now);
  // Wednesday = 3 (Sunday=0, Monday=1, Tuesday=2, Wednesday=3)
  const diff = (3 - now.getDay() + 7) % 7;
  result.setDate(now.getDate() + diff);
  result.setUTCHours(15, 0, 0, 0);
  if (result <= now) result.setDate(result.getDate() + 7);
  return result;
};

const CodeChefScreen = () => {
  const contestTime = getNextCodeChefContest();
  
  useEffect(() => {
    scheduleContestNotification('CodeChef Starters', contestTime);
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="pt-6 mt-10">
        <View className="p-4">
          <Text className="text-3xl font-bold mb-3 text-center text-orange-600">
            CodeChef Contests
          </Text>
          <ContestCard
            name="CodeChef Starters"
            startTime={contestTime}
            contestUrl="https://www.codechef.com/contests"
            platformIcon="chef-hat"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CodeChefScreen;