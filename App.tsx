
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject, 
  requestForegroundPermissionsAsync,
  watchPositionAsync} from 'expo-location'

import { styles } from './styles';
import { useEffect, useState, useRef } from 'react';

export default function App() {

  const[location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);      
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        //pitch: 70, // coloca o mapa em perspectiva
        center: response.coords
      })
    });
  }, [])

  return (
    <View style={styles.container}>
      {
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude, 
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            pinColor={'#5d38e5'}
            coordinate={{
              latitude: location.coords.latitude,
              longitude:location.coords.longitude,
            }}>
            <Callout>
            <View style={{padding: 10, borderRadius: 10}}>
              <Text>Max Auto Lavagem</Text>
              <TouchableOpacity style={{
                  backgroundColor: '#5d38e5',  
                  marginTop: 10, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: 5,
                  borderRadius: 5}}>
                <Text style={{color: '#FFF'}}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
            </Callout>  
          </Marker>
        </MapView>
      }
    </View>
  );
}

