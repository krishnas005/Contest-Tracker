// src/screens/CodeforcesScreen.js
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import ContestCard from '../components/ContestCard';
import { scheduleContestNotification } from '../services/NotificationService';

const CodeforcesScreen = () => {
  const [contests, setContests] = useState([]);
  
  const fetchContests = async () => {
    try {
      const response = await fetch('https://codeforces.com/api/contest.list');
      const data = await response.json();
      // Filter upcoming contests and sort by start time ascending
      const upcoming = data.result
        .filter(contest => contest.phase === 'BEFORE')
        .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
      setContests(upcoming);
      
      // Schedule notifications for each upcoming contest
      upcoming.forEach((contest) => {
        const contestTime = new Date(contest.startTimeSeconds * 1000);
        scheduleContestNotification(contest.name, contestTime);
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch Codeforces contests.');
    }
  };
  
  useEffect(() => {
    fetchContests();
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="pt-6 mt-10">
        <View className="p-4">
          <Text className="text-3xl font-bold mb-3 text-center text-purple-600">
            Codeforces Contests
          </Text>
          {contests.map((contest) => (
            <ContestCard
              key={contest.id}
              name={contest.name}
              startTime={new Date(contest.startTimeSeconds * 1000)}
              contestUrl="https://codeforces.com/contests"
              platformIcon="code-braces"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CodeforcesScreen;