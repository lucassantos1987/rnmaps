
import { View, Text, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';
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

import { response } from '../utils/Estabelecimentos';

export default function Mapa() {

  const[location, setLocation] = useState<LocationObject | null>(null);
  const[estabelecimento, setEstabelecimento] = useState(response);
  const[pesquisar, setPesquisar] = useState('');

  useEffect(() => {
    setEstabelecimento(response);
  }, [])

  const mapRef = useRef<MapView>(null);

  const navigation = useNavigation<StackTypes>();

  function navigationDetalhe() {
    navigation.navigate("Detalhe");
  }

  function posicaoAtual() {
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
  }

  function resetarMapa() {
    setPesquisar('');
    setEstabelecimento(response);
    posicaoAtual();
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
    posicaoAtual();
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
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}></Marker>          
        {
          estabelecimento.map(estabelecimento => {
            return <Marker
            key={estabelecimento.id}
            pinColor={'#5d38e5'}            
            coordinate={{
              latitude: estabelecimento.latitude,
              longitude:estabelecimento.longitude
            }}>
            <Image source={require('../assets/icons8-lavagem-automática-de-automóveis-48.png')} />
            <Callout onPress={navigationDetalhe}>
            <View style={{padding: 10, borderRadius: 10, width: 180, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{estabelecimento.nome}</Text>
              <View
                style={{
                  width: '100%',
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
      <View style={{ position: 'absolute', top: 10, width: '100%', backgroundColor: '#FFF', height: 125, borderBottomColor: '#D6CECE', borderBottomWidth: 1}}>
        <TextInput
          value={pesquisar}
          onChangeText={(text) => setPesquisar(text)}
          style={{
            width: '95%',
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
        <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity 
            onPress={pesquisarEstabelecimento}
            style={{ marginLeft: 15, width: '45%', height: 45, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
            <Text style={{ color: '#FFF', fontSize: 20}}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={resetarMapa}
            style={{ marginLeft: 10, width: '45%', height: 45, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
            <Text style={{ color: '#FFF', fontSize: 20}}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

