
import { View, Text, TextInput } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject, 
  requestForegroundPermissionsAsync,
  watchPositionAsync} from 'expo-location'

import { styles } from '../styles';
import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../Rotas';

import { estabelecimentos } from '../utils/Estabelecimentos';

export default function Mapa() {

  const[location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation<StackTypes>();

  function navigationDetalhe() {
    navigation.navigate("Detalhe");
  }

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
        {
          estabelecimentos.map(estabelecimento => {
            return <Marker
            key={estabelecimento.id}
            pinColor={'#5d38e5'}
            coordinate={{
              latitude: estabelecimento.latitude,
              longitude:estabelecimento.longitude
            }}>
            <Callout onPress={navigationDetalhe}>
            <View style={{padding: 10, borderRadius: 10}}>
              <Text>{estabelecimento.nome}</Text>
              <View
                style={{
                  backgroundColor: '#5d38e5',  
                  marginTop: 10, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: 5,
                  borderRadius: 5}}>
                <Text style={{color: '#FFF'}}>Ver Detalhes</Text>
              </View>
            </View>
            </Callout>  
          </Marker>

          })
        }
        </MapView>        
      }
      <View style={{ position: 'absolute', top: 10, width: '95%' }}>
      <TextInput
        style={{
          borderRadius: 10,
          margin: 10,
          color: '#000',
          borderColor: '#666',
          backgroundColor: '#FFF',
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholder={'Pesquisar Lava Rápido...'}
        placeholderTextColor={'#666'}
      />
    </View>

    </View>
  );
}

