import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import Header from '../components/Header'
import Card from '../components/Card'
import {useSelector} from 'react-redux'

export default function HomeScreen() {
  const cardData = useSelector(state=>{
    return state.cardData
  })
  return (
    <View style={{flex:1}}>
      <Header/>
      <FlatList
        data={cardData}
        renderItem={(item)=>{
          return <Card 
            videoId={item.item.id.videoId}
            title={item.item.snippet.title}
            channel={item.item.snippet.channelTitle}
          />
        }}
        keyExtractor={item=>item.id.videoId}
      />
    </View>
  );
}


