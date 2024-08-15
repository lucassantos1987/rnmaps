import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import Mapa from "./Mapa";
import Detalhe from './Detalhe';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Mapa: undefined;
    Detalhe: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
                <Stack.Screen name="Detalhe" component={Detalhe} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
