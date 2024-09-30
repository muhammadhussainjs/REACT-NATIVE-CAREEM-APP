import { useState, useEffect } from 'react'
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity  } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

function Destination({ navigation, route }) {
    const { pickup } = route.params
    const [destination, setDestination] = useState()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([])
    const [searching , setSearching] = useState('')

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
                timeInterval: 500
            }, (location) => {
                setLocation(location)
            })

            // let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
        })();
    }, []);

    if (!location) {
        return <Text style={{textAlign: 'center' , marginTop: 20, fontSize: 20}}>{errorMsg || "Location needs your permission"}</Text>
    }

    const search = (text) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3UH1aKeT8Z1GxT3r1CCuN9rTR5sB+n8/JH9JqNuSdsJs='
            }
        };

        const { latitude, longitude } = location.coords

        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000`, options)
            .then(response => response.json())
            .then(response => setPlaces(response.results))
            .catch(err => console.error(err));
    }
    return <View>

        <Text style={{fontSize:16 , paddingBottom: 8 , paddingTop:8 , paddingLeft: 6 }}><Text style={{ fontWeight: 'bold', color: 'blue' }}>Pickup:</Text> {pickup.name}, {pickup.location.address}</Text>

        <MapView
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0009,
                longitudeDelta: 0.0009
            }}
            style={styles.map}
        >

            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title={"My location"}
                description={"this is description"}
            />

        </MapView>

        <View style={styles.searchContainer}>
        <TextInput
                    style={styles.search}
                    placeholder="Enter any location"
                    onChangeText={(text) => {
                        setSearching(text);
                        search(text);
                    }}
                    value={searching}
                />

            {places.map(item => {
                return <TouchableOpacity onPress={() => {setDestination(item)
                setSearching(item.name + '' + item.location.address) ; setPlaces([])}}>
                    <Text>{item.name}, {item.location.address}</Text>
                </TouchableOpacity>
            })}
        </View>


      
        <TouchableOpacity
      style={{ padding: 20, marginTop: 15 , paddingLeft:90 , paddingRight:90, backgroundColor: 'lightgreen', borderRadius: 10 }}
      onPress={() => navigation.navigate('CarSelection', { pickup, destination })}
    >
      <Text style={{ color: 'black', fontSize: 20 }}>Select Destination</Text>
    </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '75%',
    },
    searchContainer: {
        position: 'absolute',
        top: 30,
        width: '100%'
    },
    search: {
        backgroundColor: 'white',
        height: 50,
        width: '100%', 
        paddingLeft: 12,
        padding:10,
        backgroundColor:'white',
        fontSize:16
    }
});

export default Destination