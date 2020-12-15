import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Entypo,Ionicons,MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import {useNavigation, useTheme} from '@react-navigation/native'
import { useDispatch, useSelector} from 'react-redux';


export default function Header() {
    const navigation = useNavigation()
    const currentTheme = useSelector(state=>{
      return state.myDarkMode
    })
    const dispatch = useDispatch()
    const {colors} = useTheme()
    const myColor = colors.iconColor;
  return (
    <View style={{
        height:45,
        marginTop: Constant.statusBarHeight,
        backgroundColor:colors.headerColor,
        flexDirection:'row',
        justifyContent:'space-between',
        elevation:4,
        shadowColor:'white',
        shadowOpacity:1.0,
        shadowOffset:{width:10,height:10}
    }}>
      <View style={{
          flexDirection:'row',
          margin:5
      }}>
        <Entypo style={{marginLeft:20}} name='youtube' size={32} color='red'/>
        <Text style={{fontSize:22,
        marginLeft:5,
        fontWeight:'bold'}}>YouTube</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',width:150,margin:5}}>
          <Ionicons name='md-videocam' size={32} color={myColor}/>
          <Ionicons name='md-search' size={32} color={myColor}
          onPress={()=>navigation.navigate('Search')}
          />
          <MaterialIcons name='account-circle' size={32} color={myColor}
            onPress={()=>dispatch({type:'change_theme',payload:!currentTheme})}
          />
      </View>
    </View>
  );
}


