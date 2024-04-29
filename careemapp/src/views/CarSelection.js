import { View, Text, Button , Image , TouchableOpacity } from 'react-native'
import { requestARide } from '../config/firebase'

function CarSelection({ route }) {
    const { pickup, destination } = route.params
    const fares = {
        bike: 50,
        car: 120,
        rikshaw: 80,
        
    }

    const checkFare = (vehicle) => {
        const baseFare = fares[vehicle]

        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main
        const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main
        const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong)
        const fare = Math.round(distance * baseFare)

        alert('Rs. ' + fare)

        requestARide({ pickup, destination, carType: vehicle, fare })
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    return <View>

        <Text style={{fontSize: 18}}>Pickup: {pickup.name}, {pickup.location.address}</Text>
        <Text style={{fontSize: 18}}>Destination: {destination.name}, {destination.location.address}</Text>
        <Text style={{fontSize: 28 , alignItems: 'center', color: 'red' , textAlign: 'center'}}> PLEASE SELECT VEHICLE
</Text>

        <View style={{ marginTop:15}}>
        <TouchableOpacity onPress={() => checkFare('bike')}>
        <Image source={require('../assets/bike.webp')} style={{width:'full' , height:150}}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => checkFare('car')}>
        <Image source={require('../assets/carr.webp')} style={{width:'full' , height:150}}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => checkFare('rikshaw')}>
        <Image source={require('../assets/rikshaw.jpg')} style={{width:'full' , height:150}}/>
        </TouchableOpacity>
        
 </View>      
    </View>
}

export default CarSelection