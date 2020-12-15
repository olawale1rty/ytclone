import React,{useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MiniCard from '../components/MiniCard';
import Constant from 'expo-constants';
import {useSelector, useDispatch} from 'react-redux'
import { useTheme} from '@react-navigation/native'

const SearchScreen = ({navigation}) => {
    const {colors} = useTheme()
    const textColor = colors.iconColor
    const [value,setValue] = useState('')
    // const [miniCardData,setMiniCard] = useState([])
    const dispatch = useDispatch()
    const miniCardData = useSelector(state => {
        return state.cardData
    })
    const [loading,setLoading] = useState(false)
    const fetchData =  () =>{
        setLoading(true)
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyAxkpAkfGawDbzjxoJwOrB3a1BE9xTBNls`)
        .then(res=>res.json())
        .then(res=>{
            // setMiniCard(res.items)
            dispatch({type: 'add',payload: res.items})
            setLoading(false)})
        .catch(err=>console.log(err))
    }

    return(
        <View style={{
            flex:1,
            marginTop: Constant.statusBarHeight
            }}>
            <View style={{
                padding:5,
                flexDirection:'row',
                justifyContent:'space-around',
                elevation:5,
                backgroundColor:colors.headerColor,
                shadowColor:colors.headerColor,
                shadowOpacity:1.0,
                shadowOffset:{width:10,height:10}
            }}>
                <Ionicons style={{color:textColor}} name='md-arrow-back' size={32}
                onPress={()=>navigation.goBack()}
                />
                <TextInput
                    value={value}
                    style={{width:'70%',
                    backgroundColor:'#e6e6e6'}}
                    onChangeText={(text)=>{setValue(text)}}
                />
                <Ionicons style={{color:textColor}} name='md-send' size={32} onPress={()=>fetchData()}/>
            </View>
            {loading?<ActivityIndicator size='large' color='red' style={{marginTop:10}}/>:null}
            <FlatList
                data={miniCardData}
                renderItem={(item)=>{
                    return <MiniCard
                    videoId={item.item.id.videoId}
                    title={item.item.snippet.title}
                    channel={item.item.snippet.channelTitle}
                    />
                }}
                keyExtractor={item=>item.id.videoId}
            />
        </View>
    )
}

export default SearchScreen