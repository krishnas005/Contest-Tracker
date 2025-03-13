// src/components/ContestCard.js
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContestCard = ({ name, startTime, contestUrl, platformIcon }) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = startTime - now;
      if (diff <= 0) {
        setTimeLeft("Contest Started");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        let display = "";
        if (days > 0) display += `${days}d `;
        display += `${hours}h ${minutes}m ${seconds}s`;
        setTimeLeft(display);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  
  return (
    <TouchableOpacity
      onPress={() => contestUrl && Linking.openURL(contestUrl)}
      activeOpacity={0.9}
      className="bg-white p-5 m-3 rounded-2xl shadow-lg border border-blue-300"
    >
      <View className="flex-row items-center mb-3">
        
        <Text className="text-xl font-bold text-gray-800">{name}</Text>
      </View>
      <Text className="text-sm text-gray-500">Starts at: {startTime.toLocaleString()}</Text>
      <Text className="text-lg mt-3 font-semibold text-blue-600">Countdown: {timeLeft}</Text>
    </TouchableOpacity>
  );
};

export default ContestCard;
