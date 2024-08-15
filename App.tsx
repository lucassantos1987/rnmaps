import { NativeBaseProvider, StatusBar } from "native-base";
import Rotas from "./Rotas";

export default function App() {
  return(
    <NativeBaseProvider>
      <StatusBar backgroundColor={"#5d38e5"}/>
      <Rotas/>
    </NativeBaseProvider>
  )
}