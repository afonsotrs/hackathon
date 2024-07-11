import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './header'; // Certifique-se de ajustar o caminho conforme necessário
import Home from './home';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Home/>
      </View>
      <View style={styles.footer}>
            <TouchableOpacity style={styles.bntinicil} onPress={() => navigation.navigate('Página Principal')}>
                <Text>Inícil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Formulário')} >
                <Text>formulario</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Perfil</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
  },
});

export default MainScreen;
