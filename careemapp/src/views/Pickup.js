import { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

function Pickup({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([])
    const [pickup, setPickup] = useState()
    const [searchText, setSearchText] = useState('');

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
        return <Text>{errorMsg || "Location needs your permission"}</Text>
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

    return <View style={styles.container}>

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
                        setSearchText(text);
                        search(text);
                    }}
                    value={searchText}
                />
            {places.map(item => {
                return <TouchableOpacity onPress={() => {setPickup(item) 
                 setSearchText(item.name + ', ' + item.location.address); } }>
                    <Text>{item.name}, {item.location.address}</Text>
                </TouchableOpacity>
            })}
        </View>
        <Button title="Select Destination"
            onPress={() => navigation.navigate('Destination', { pickup })}
        />
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '80%',
    },
    searchContainer: {
        position: 'absolute',
        top: 30,
        width: '100%'
    },
    search: {
        backgroundColor: 'white',
        height: 50,
        width: '100%'
    }
});

//fsq3UH1aKeT8Z1GxT3r1CCuN9rTR5sB+n8/JH9JqNuSdsJs=

export default Pickup