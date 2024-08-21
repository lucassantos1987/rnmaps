import { TouchableOpacity, Text } from "react-native";
import { VStack } from "native-base";

import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../Rotas';

export default function Home() {

  const navigation = useNavigation<StackTypes>();

  function navigationMapa() {
    navigation.navigate("Mapa");
  }


  return (
    <VStack flex={1} alignItems="center" justifyContent="center" padding={5}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 20}}>Visualização por:</Text>

      <TouchableOpacity         
        style={{ marginTop: 10, width: '100%', height: 50, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
        <Text style={{ color: '#FFF', fontSize: 20}}>Lista</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={navigationMapa}
        style={{marginTop: 10,  width: '100%', height: 50, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
        <Text style={{ color: '#FFF', fontSize: 20}}>Mapa</Text>
      </TouchableOpacity>

    </VStack>
  );
}

