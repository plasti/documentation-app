import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from './screens/home'
import ScanQrScreen from './screens/scanqr'
import DetailsScreen from './screens/details'
import DownloaderScreen from './screens/downloader'
// import DocumentationScreen from './screens/documentation'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const HomeStack = (props) => {
   return (
      <Stack.Navigator>
         <Stack.Screen 
            name="Home" 
            options={ (props) => ({
               headerTitle: 'Documentación',
               headerTitleAlign: 'center',
            })}
         >
            {(props) => (<HomeScreen {...props}/>)}
         </Stack.Screen>
         <Stack.Screen 
            name="Qr" 
            options={ (props) => ({
               headerTitle: 'Escanear QR',
               headerTitleAlign: 'center',
            })}
         >
            {(props) => (<ScanQrScreen {...props}/>)}
         </Stack.Screen>
         <Stack.Screen 
            name="Details" 
            options={ (props) => ({
               headerTitle: 'Detalles',
               headerTitleAlign: 'center',
            })}
         >
            {(props) => (<DetailsScreen {...props}/>)}
         </Stack.Screen>
         <Stack.Screen 
            name="Downloader" 
            options={ (props) => ({
               headerTitle: 'Descargando',
               headerTitleAlign: 'center',
            })}
         >
            {(props) => (<DownloaderScreen {...props}/>)}
         </Stack.Screen>
      </Stack.Navigator>
   );
}



export default function App() {
   return (
      <>
         <StatusBar style="auto"/>
         <NavigationContainer>
            <HomeStack/>   
         </NavigationContainer>
      </>
   );
}