import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import HomeScreen from './src/screens/Home'
import SearchScreen from './src/screens/Search'
import VideoPlayer from './src/screens/VideoPlayer'
import Explore from './src/screens/Explore'
import Subscribe from './src/screens/Subscribe'
import {Provider, useSelector} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer} from './src/reducers/reducer'
import {themeReducer} from './src/reducers/themeReducer'
const rootReducer = combineReducers({
  cardData: reducer,
  myDarkMode: themeReducer
})
const store = createStore(rootReducer)

const customDarkTheme = {
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor: '#404040',
    iconColor: 'white',
    tabIcon: 'white'
  }
}

const customDefaultTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,  
    headerColor: 'white',
    iconColor: 'black',
    tabIcon: 'red'
  }
}

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const RootHome = () => {
  const {colors} = useTheme()
  return(
    <Tabs.Navigator
      screenOptions={({route})=> ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if(route.name === 'Home'){
            iconName='home'
          } else if (route.name === 'Explore'){
            iconName='explore' 
          }else if (route.name === 'Subscribe'){
            iconName='subscriptions' 
          }
          return <MaterialIcons name={iconName} size={32} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.tabIcon,
        inactiveTintColor: 'grey'
      }}
    >
      <Tabs.Screen name='Home' component={HomeScreen}/>
      <Tabs.Screen name='Explore' component={Explore}/>
      <Tabs.Screen name='Subscribe' component={Subscribe}/>
    </Tabs.Navigator>
  )
}
export default App = ()=>{
  return(
    <Provider store={store}>
      <Navigation/>
    </Provider>
  )
}
export function Navigation() {
  const currentTheme = useSelector(state=>{
    return state.myDarkMode
  })
  return (
      <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='RootHome' component={RootHome}/>
          <Stack.Screen name='Search' component={SearchScreen}/>
          <Stack.Screen name='Player' component={VideoPlayer}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
