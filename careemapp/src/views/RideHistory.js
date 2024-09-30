import React, { useState, useEffect } from 'react';
import { View, Text, Button , ScrollView } from 'react-native';
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
  },[data])
  return (
    <ScrollView>

      <Text style={{fontSize: 28 , marginLeft: 100 , marginTop:20 , font: 'bold' , color: 'blue'}}>RideHistory</Text>
      {/* <Button title="Detail" onPress={() => navigation.navigate('RideHistoryDetail')} /> */}
      {data.length > 0 ? (
      data.map((item, index) => (
        <View key={index} style={{marginTop: 20, paddingLeft:8 , paddingBottom:4 , paddingTop:4 , gap:6,
         borderRadius: 10 ,borderColor: 'lblack',  borderWidth: 1 , marginLeft: 12 , marginRight:12  , marginBottom:20}}>
           <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Car Type:</Text> {item.carType}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Fare:</Text> {item.fare}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Pickup Location:</Text> {item.pickup.name}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Pickup Location Adress:</Text> {item.pickup.location.formatted_address}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Distance to Pickup</Text> {item.pickup.distance}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Destination:</Text> {item.destination.name}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Destination Address:</Text> {item.destination.location.formatted_address}</Text>
      <Text style={{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Distance to Destination:</Text> {item.destination.distance}</Text>
          
        </View>
      ))
    ) : (
      <Text style={{fontSize: 28 , marginLeft: 100 , marginTop:20 , font: 'bold'}} >Loading...</Text>
    )}
  
</ScrollView>
);
}

export default RideHistory;
