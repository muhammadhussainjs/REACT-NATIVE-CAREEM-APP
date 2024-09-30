import { View, Button , Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind';

function Dashboard({ navigation }) {


 
      return   <View style={{ backgroundColor:'orange' , flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{fontSize:40 , color:'black'}}>WELCOME TO CAREEM APP</Text>
    <View style={{ borderRadius: 10, padding: 20 }}>
    <TouchableOpacity
      style={{ padding: 20, paddingLeft:90 , paddingRight:90, backgroundColor: 'lightgreen', borderRadius: 30 }}
      onPress={() => navigation.navigate('Pickup')}
    >
      <Text style={{ color: 'black', fontSize: 20 }}>Take a Ride</Text>
    </TouchableOpacity>
    </View>
    </View>
  
  

}

export default Dashboard