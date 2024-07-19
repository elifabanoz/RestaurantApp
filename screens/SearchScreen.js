import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useState,useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';
import ResultsList from '../components/ResultsList';


export default function SearchScreen() {
  const [searchApi,results,error]=useResult();
  console.log(results);
  const [term, setTerm] = useState('');


  useEffect(() => {
    searchApi('');
  }, []);


  const filterResultsByPrice=(priceLevel)=>{
    return results.filter((result)=>{
      return result.price_level===priceLevel;
    });
  };
  const cheapResults = filterResultsByPrice(1);
  const convenientResults = filterResultsByPrice(2);
  const expensiveResults = filterResultsByPrice(3);

  return (
    <View style={{ flex: 1 }}>
       
      <SearchBar 
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
        onClear={() => searchApi('restaurant')}
      />
      {error ? (
        <Text>{error}</Text>
      ) : (cheapResults.length === 0 && convenientResults.length === 0 && expensiveResults.length === 0) ? (
        <Text style={styles.text}>No results found</Text>
      ) : (
        <ScrollView>
          {cheapResults.length > 0 && (
            <ResultsList 
              title="Cheap Restaurants"
              results={cheapResults}
            />
          )}
          {convenientResults.length > 0 && (
            <ResultsList 
              title="Convenient Restaurants"
              results={convenientResults}
            />
          )}
          {expensiveResults.length > 0 && (
            <ResultsList 
              title="Expensive Restaurants"
              results={expensiveResults}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    marginLeft:5,
  }
});