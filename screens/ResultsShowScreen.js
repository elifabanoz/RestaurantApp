import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import google from '../api/google';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResultsShowScreen({route}) {
    const [result, setResult] = useState(null)
    const {id}=route.params;
  

    const getResult=async(id)=>{
        const response= await google.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=YOURAPIKEY`)
        setResult(response.data.result)
    }
    const getPhotoUrl = (photoReference) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=YOURAPIKEY`;
      };

    useEffect(()=>{
        getResult(id);
    },[id]);

    if(!result){
        return <Text>Loading...</Text>;
    }
  return (
    <View>
     <View style={styles.allStyle}>
      <Text style={styles.textStyle}>{result.name}</Text>
      <Text>{result.formatted_address}</Text>
      {result.formatted_phone_number? (
         <Text>{result.formatted_phone_number}</Text>
      ):null}
      <View style={styles.statusContainer}>
      {result.opening_hours && result.opening_hours.open_now ?(
        <View style={styles.openStatus}>
        <MaterialIcons name="delivery-dining" size={24} color="black" />
        <Text style={styles.statusText}>Currently Open</Text>
        </View>
      ):(
        <View style={styles.openStatus}>
        <AntDesign name="closecircleo" size={24} color="black" />
        <Text style={styles.statusText}>Currently Closed</Text>
        </View>
      )}
      </View>
     </View>
     <FlatList 
      //ItemSeparatorComponent={() => <View style={{ width: 10 }} />} 
      //contentContainerStyle={{ paddingVertical: 30 }} 
     data={result.photos}
     keyExtractor={(photo)=> photo.photo_reference}
     renderItem={({item})=>{
        return <Image style={styles.image}
        source={{uri:getPhotoUrl(item.photo_reference)}}/>
     }}
     />
     
     
     {/* <Text>Types:</Text>
     {result.types && result.types.map((type,index)=>
    (<Text key={index} style={styles.type}>
        {type}
    </Text>))}  */}
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:20,
        fontWeight:'500',
    },
    image:{
        height:180,
        margin:10,
        borderRadius:20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
    allStyle:{
        marginStart:10,
    },
    statusText:{
        marginLeft:5,
        color:'red'
        
    },
    openStatus:{
        flexDirection:'row',
        alignItems:'center',
    }
    
})