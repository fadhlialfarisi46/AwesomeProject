import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieHome from './screens/MovieTab/MovieHome';
import MovieShowMore from './screens/MovieTab/MovieShowMore';
import TVShowHome from './screens/TVTab/TVShowHome';
import TVShowShowMore from './screens/TVTab/TVShowMore';
import Detail from './screens/Detail';

const Tab = createBottomTabNavigator();
const MovieStack = createNativeStackNavigator();
const TVShowStack = createNativeStackNavigator();

function MovieStackScreen() {
  return (
    <MovieStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='MovieHome'>
      <MovieStack.Screen name="MovieHome" component={MovieHome} options={{ headerShown: false }} />
      <MovieStack.Screen name="MovieShowMore" component={MovieShowMore} options={{ headerShown: false }} />
      <MovieStack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
    </MovieStack.Navigator>
  );
}

function TVShowStackScreen() {
  return (
    <TVShowStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='TVShowHome'>
      <TVShowStack.Screen name="TVShowHome" component={TVShowHome} options={{ headerShown: false }} />
      <TVShowStack.Screen name="TVShowShowMore" component={TVShowShowMore} options={{ headerShown: false }} />
      <TVShowStack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
    </TVShowStack.Navigator>
  );
}

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'TV Shows') {
            iconName = focused ? 'tv' : 'tv-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Movies" component={MovieStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="TV Shows" component={TVShowStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;

