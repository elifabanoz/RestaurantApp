import { useEffect, useState } from "react";
import google from "../api/google";

export default()=>{
    const [results, setResults] = useState([]);
    const [error, setError] = useState('')
    const searchApi=async(searchTerm)=>{
        try{
            const response= await google.get('/maps/api/place/nearbysearch/json',{
                params:{
                    limit:100,
                    type:searchTerm,
                    location:'39.9334,32.8597',
                    radius:20000,
                    key:'YOURAPIKEY',
                },
            });
            setResults(response.data.results);
            setError('');
        }catch(error){
           setError('Network Error');
        }
      
    };


    useEffect(()=>{
        searchApi('restaurant');
    },[]);

    return[searchApi,results,error];
};