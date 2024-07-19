import { StyleSheet,View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function SearchBar({term,onTermChange,onTermSubmit, onClear}) {
  return (
    <View style={styles.backgroundStyle}>
       <TouchableOpacity onPress={onTermSubmit}>
      <AntDesign style={styles.iconStyle}
      name="search1" size={30} color="black" />
      </TouchableOpacity>
      <TextInput style={styles.inputStyle}
      placeholder='Search'
      autoCorrect={false}
      autoCapitalize='none'
      value={term}
      onChangeText={(newTerm) => {
        onTermChange(newTerm);
        if (newTerm === '') {
          onClear();
        }
      }}
      
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor:'pink',
        flexDirection:'row',
        margin:10,
        height:40,
        alignItems:'center',
        borderRadius:20,


    },
    iconStyle:{
        marginHorizontal:10,

    },
    inputStyle:{
        flex:1,
        fontSize:18,

    }
})