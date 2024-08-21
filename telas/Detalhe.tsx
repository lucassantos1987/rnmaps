import { VStack } from "native-base";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { styles } from "../styles";

import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../Rotas';


export default function Detalhe() {

    const navigation = useNavigation<StackTypes>();

    function voltar() {
        navigation.goBack();
    }

    return (
        <VStack flex={1} alignItems="center" justifyContent={"center"} padding={5}>
            <Image source={require('../assets/logo-lava-rapido-mock.png')} style={styles.imageProvider}/>
            <View style={{marginTop: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}> Lava Rapido Express</Text>
            </View>
            <View style={{marginTop: 20, width: '100%'}}>
                <TouchableOpacity style={{width: '100%', backgroundColor: '#5d38e5', padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#FFF'}}>Agendar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={voltar}
                    style={{width: '100%', marginTop: 10, backgroundColor: '#770493', padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#FFF'}}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </VStack>
    );
}