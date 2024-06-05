import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Study',
          tabBarIcon: ({ color }) => <AntDesign name="play" size={24} color="black" />,
        }}
      />
        <Tabs.Screen
          name="add"
          options={{
            title: 'add',
            tabBarIcon: ({ color }) => <AntDesign name="pluscircle" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="custom"
          options={{
            title: 'custom',
            tabBarIcon: ({ color }) => <AntDesign name="questioncircle" size={24} color="black" />,
          }}
        />
      <Tabs.Screen
        name="review"
        options={{
          title: 'review',
          tabBarIcon: ({ color }) => <AntDesign name="book" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
