import { NativeBaseProvider, StatusBar} from 'native-base';
import {useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/Signin';
import {THEME} from './src/styles/theme';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { Pools } from './src/screens/Pools';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

  return (
    <AuthContextProvider>
      <NativeBaseProvider theme={THEME}>
          <StatusBar
            barStyle='light-content'
            backgroundColor="transparent"
            translucent
          />
          {
            fontsLoaded?<Pools/>:<Loading/>
          }
        

      </NativeBaseProvider>
    </AuthContextProvider>
  );
}

