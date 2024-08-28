
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Callout, LatLng, Marker } from 'react-native-maps';
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

import { reponse } from '../utils/Estabelecimentos';

export default function Mapa() {

  const[location, setLocation] = useState<LocationObject | null>(null);
  const[estabelecimento, setEstabelecimento] = useState(reponse);
  const[pesquisar, setPesquisar] = useState('');

  useEffect(() => {
    setEstabelecimento(reponse);
  }, [])

  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation<StackTypes>();

  function navigationDetalhe() {
    navigation.navigate("Detalhe");
  }

  function pesquisarEstabelecimento() {
    let filtro = estabelecimento.filter(e => e.nome.toLowerCase().includes(pesquisar.toLowerCase()));

    if (filtro.length) {
      const coords: LatLng[] = [];
      for (const item of filtro) {
        coords.push({
          latitude: item.latitude,
          longitude: item.longitude
        })
      }

      setEstabelecimento(filtro);
      mapRef.current?.fitToCoordinates(coords, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
        animated: true
      })
      Keyboard.dismiss();
    } else {
      setEstabelecimento(reponse);
    }
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
          estabelecimento.map(estabelecimento => {
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
      <View style={{ position: 'absolute', top: 10, width: '95%', flexDirection:'row' }}>
        <TextInput
          value={pesquisar}
          onChangeText={(text) => setPesquisar(text)}
          style={{
            width: '78%',
            height: 45,
            borderRadius: 10,
            margin: 10,
            color: '#000',
            borderColor: '#666',
            backgroundColor: '#FFF',
            borderWidth: 1,            
            paddingHorizontal: 10,
            fontSize: 18,
          }}
          placeholder={'Pesquisar Lava Rápido...'}
          placeholderTextColor={'#666'}
        />
        <TouchableOpacity 
          onPress={pesquisarEstabelecimento}
          style={{ marginTop: 10, marginLeft: 0, width: '15%', height: 45, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
          <Text style={{ color: '#FFF', fontSize: 20}}>P</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

