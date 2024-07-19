import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import ResultDetail from './ResultDetail'
import { useNavigation } from '@react-navigation/native'


export default function ResultsList({title,results}) {
    const navigation=useNavigation()

    console.log(results)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList 
      horizontal
      data={results}
      keyExtractor={(item)=>item.place_id}
      renderItem={({item})=>{
        return(
            <TouchableOpacity onPress={()=>
                navigation.navigate('Result',{id:item.place_id})}>
                <ResultDetail result={item}/>
            </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />} 
        contentContainerStyle={{ paddingHorizontal: 10 }} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5,
        color:'blue'
      },
});