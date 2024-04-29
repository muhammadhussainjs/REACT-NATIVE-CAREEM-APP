import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { collection, getDocs  } from 'firebase/firestore';
import db from '../config/firebase';

function RideHistory({ navigation }) {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, 'rides'));
      const rideData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        rideData.push(doc.data());
      });
      setData(rideData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
fetchData()
  },[])
  return (
    <View>
      <Text style={{fontSize: 18}}>Here RideHistory will come</Text>
      {/* <Button title="Detail" onPress={() => navigation.navigate('RideHistoryDetail')} /> */}
      {data.length > 0 ? (
      data.map((item, index) => (
        <View key={index} style={{marginTop: 20 , alignItems: 'center' , 
         borderRadius: 10 ,borderColor: 'black',  borderWidth: 1 }}>
           <Text style={{fontSize: 18}}>Car Type: {item.carType}</Text>
      <Text style={{fontSize: 18}}>Fare: {item.fare}</Text>
      <Text style={{fontSize: 18}}>Pickup Location: {item.pickup.name}</Text>
      <Text style={{fontSize: 18}}>Pickup Location Address: {item.pickup.location.formatted_address}</Text>
      <Text style={{fontSize: 18}}>Distance to Pickup: {item.pickup.distance}</Text>
      <Text style={{fontSize: 18}}>Destination: {item.destination.name}</Text>
      <Text style={{fontSize: 18}}>Destination Address: {item.destination.location.formatted_address}</Text>
      <Text style={{fontSize: 18}}>Distance to Destination: {item.destination.distance}</Text>
          
        </View>
      ))
    ) : (
      <Text>Loading...</Text>
    )}
  </View>
);
}

export default RideHistory;
