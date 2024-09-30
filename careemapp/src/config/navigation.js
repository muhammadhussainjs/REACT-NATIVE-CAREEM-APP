import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../views/Dashboard'
import Pickup from '../views/Pickup'
import Destination from '../views/Destination'
import CarSelection from '../views/CarSelection'
import RideHistory from '../views/RideHistory'
import RideHistoryDetail from '../views/RideHistoryDetail'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Ride History" component={RideHistoryStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function DashboardStack() {
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Pickup" component={Pickup} />
        <Stack.Screen name="Destination" component={Destination} />
        <Stack.Screen name="CarSelection" component={CarSelection} />
    </Stack.Navigator>
}


function RideHistoryStack() {
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="RideHistory" component={RideHistory} />
        <Stack.Screen name="RideHistoryDetail" component={RideHistoryDetail} />
    </Stack.Navigator>
}






export default MainNavigator