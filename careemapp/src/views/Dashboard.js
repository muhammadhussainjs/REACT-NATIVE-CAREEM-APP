import { View, Button , Text } from 'react-native'

function Dashboard({ navigation }) {


 
      return   <View style={{ backgroundColor:'lightgray' , flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{fontSize:40 , color:'red'}}>WELCOME TO CAREEM APP</Text>
    <View style={{ borderRadius: 10, padding: 20 }}>
      <Button 
        title="Take a Ride" 
        onPress={() => navigation.navigate('Pickup')} 
      />
    </View>
  </View>
  

}

export default Dashboard