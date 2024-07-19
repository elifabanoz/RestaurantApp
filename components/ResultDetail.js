import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
const apiKey = 'YOURAPIKEY';

const getPhotoUrl = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

export default function ResultDetail({result}) {
    const photoUrl = result.photos&& result.photos.length>0 ?
     getPhotoUrl(result.photos[0].photo_reference):null;
  return (
    <View>
      {photoUrl ? (
        <Image style={{ width: 250, height: 120, borderRadius:20 }} source={{ uri: photoUrl }} />
      ) : (
        <Text>No Image Available</Text>
      )}
      <Text style={styles.styleText}>{result.name}</Text>
      <Text>Star: {result.rating},
         Total Review: {result.user_ratings_total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    styleText:{
        fontSize:18,
        fontWeight:'500'
    }
})