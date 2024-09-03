import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import LavaRapido from "./telas/cadastro/LavaRapido";
import Home from "./telas/Home";
import Mapa from "./telas/Mapa";
import Detalhe from './telas/Detalhe';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    LavaRapido: undefined;
    Home: undefined;
    Mapa: undefined;
    Detalhe: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LavaRapido" component={LavaRapido} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
                <Stack.Screen name="Detalhe" component={Detalhe} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
