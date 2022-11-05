import {NavigationContainer} from '@react-navigation/native'

import {AppRoutes} from './app.routes';
import {SignIn} from '../screens/Signin';

import {useAuth} from '../hooks/useAuth';
import { Box } from 'native-base';

export function Routes(){
    const {user} = useAuth();
    return(
        <Box flex={1} bg="gray.900">
            <NavigationContainer>
                {user.nome?<AppRoutes/>:<SignIn/>}
            </NavigationContainer>
        </Box>
        
    );
}