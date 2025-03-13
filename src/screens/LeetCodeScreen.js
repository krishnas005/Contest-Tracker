// src/screens/LeetCodeScreen.js
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import ContestCard from '../components/ContestCard';
import { scheduleContestNotification } from '../services/NotificationService';

// Compute next Sunday at 14:30 UTC for Weekly Contest
const getNextWeeklyContest = () => {
  const now = new Date();
  const result = new Date(now);
  // Sunday = 0 (JS: Sunday=0,... Saturday=6)
  const diff = (7 - now.getDay()) % 7;
  result.setDate(now.getDate() + diff);
  result.setUTCHours(14, 30, 0, 0);
  if (result <= now) result.setDate(result.getDate() + 7);
  return result;
};

// Compute next Biweekly Contest (every second Saturday at 14:30 UTC)
// Using a base date (first contest) as January 6, 2024
const getNextBiweeklyContest = () => {
  const now = new Date();
  const base = new Date('2024-01-06T14:30:00Z');
  if (now < base) return base;
  const diffDays = Math.floor((now - base) / (1000 * 60 * 60 * 24));
  const periodsPassed = Math.floor(diffDays / 14);
  let next = new Date(base);
  next.setDate(base.getDate() + periodsPassed * 14);
  if (next <= now) next.setDate(next.getDate() + 14);
  return next;
};

const LeetCodeScreen = () => {
  const weeklyContest = getNextWeeklyContest();
  const biweeklyContest = getNextBiweeklyContest();
  
  useEffect(() => {
    scheduleContestNotification('LeetCode Weekly Contest', weeklyContest);
    scheduleContestNotification('LeetCode Biweekly Contest', biweeklyContest);
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="pt-6 mt-10">
        <View className="p-4">
          <Text className="text-3xl font-bold mb-3 text-center text-blue-800">
            LeetCode Contests
          </Text>
          <ContestCard
            name="LeetCode Weekly Contest"
            startTime={weeklyContest}
            contestUrl="https://leetcode.com/contest/"
            platformIcon="code-tags"
          />
          <ContestCard
            name="LeetCode Biweekly Contest"
            startTime={biweeklyContest}
            contestUrl="https://leetcode.com/contest/"
            platformIcon="code-tags"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeetCodeScreen;