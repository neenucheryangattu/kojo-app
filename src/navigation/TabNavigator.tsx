import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const ProfileTabIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  const { user } = useAuth();
  const initial = user?.firstName?.trim()?.charAt(0).toUpperCase() || '?';

  return (
    <View
      style={{
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        backgroundColor: focused ? theme.colors.primary : '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: focused ? 2 : 0,
        borderColor: theme.colors.primary,
      }}
    >
      <Text
        style={{
          fontSize: theme.fontSizes.s,
          fontWeight: 'bold',
          color: focused ? '#FFFFFF' : '#666666',
        }}
      >
        {initial}
      </Text>
    </View>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EDEEF2',
          height: Platform.OS === 'ios' ? hp('10.5%') : hp('8.5%'),
          paddingTop: hp('1%'),
          paddingBottom: Platform.OS === 'ios' ? hp('3.5%') : hp('1.25%'),
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Profile') {
            return <ProfileTabIcon focused={focused} color={color} />;
          }

          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={theme.iconSizes.m} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#A0A0A0',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
