import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  Rotas  from './src/rotas/rotas.js';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Rotas/>
    </NavigationContainer>
  );
}