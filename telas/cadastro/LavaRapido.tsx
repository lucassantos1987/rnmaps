import { Box, FormControl, Input, ScrollView } from "native-base";
import { SetStateAction, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

const i_cep = require('awesome-cep');

export default function LavaRapido() {

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    function retornarEnderecoCep() {
        if (cep != "") {
            i_cep.findCEP(cep).then((response: { address_name: SetStateAction<string>; }) => {
                setEndereco(response.address_name)
            })            
        }
    }

    return (
        <ScrollView flex={1} padding={5}>
            <Text>Faça seu cadastro!!</Text>

            <Box paddingBottom={10}>
                <FormControl marginTop={5}>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Input
                        placeholder="Nome da empresa"
                        width={"100%"}
                        borderRadius={10}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </FormControl>
                <FormControl marginTop={10}>
                    <FormControl.Label>Cep</FormControl.Label>
                    <Input
                        placeholder="Informe o cep"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={cep}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <TouchableOpacity
                    style={{marginTop: 10,  width: '100%', height: 50, backgroundColor: '#5d38e5', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                    <Text style={{ color: '#FFF', fontSize: 16}}>Pesquisar Cep</Text>
                </TouchableOpacity>
                <FormControl marginTop={5}>
                    <FormControl.Label>Endereço</FormControl.Label>
                    <Input
                        placeholder="Endereço"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={endereco}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <FormControl marginTop={3}>
                    <FormControl.Label>Número</FormControl.Label>
                    <Input
                        placeholder="Número"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={numero}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <FormControl marginTop={3}>
                    <FormControl.Label>Bairro</FormControl.Label>
                    <Input
                        placeholder="Bairro"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={bairro}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <FormControl marginTop={3}>
                    <FormControl.Label>Cidade</FormControl.Label>
                    <Input
                        placeholder="Cidade"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={cidade}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <FormControl marginTop={3}>
                    <FormControl.Label>Estado</FormControl.Label>
                    <Input
                        marginLeft={0}
                        placeholder="Estado"
                        width={"100%"}
                        borderRadius={10}
                        maxLength={8}
                        keyboardType={'numeric'}
                        value={estado}
                        onChangeText={(text) => setCep(text)}
                    />
                </FormControl>
                <TextInput
                    value={latitude}
                    style={{ width: '100%', height: 50, marginTop: 10, borderColor: '#000', borderWidth: 2, paddingLeft: 10}}
                    placeholder="LATITUDE"
                />
                <TextInput
                    value={longitude}
                    style={{ width: '100%', height: 50, marginTop: 10, borderColor: '#000', borderWidth: 2, paddingLeft: 10}}
                    placeholder="LONGITUTE"
                />
            </Box>
        </ScrollView>
    ); 
}