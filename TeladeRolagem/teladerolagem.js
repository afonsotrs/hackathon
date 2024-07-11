import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import MainScreen from './MainScreen';
import { useNavigation } from '@react-navigation/native';


const slides = [
  {
    key: '1',
    title: 'Alaga Parnamirim',
    text: 'Seja Bem-Vindo ao nosso App! Deslize para esquerda ou clique no botão e nos conheça melhor!',
    image: require('./assets/BV.png')
  },
  {
    key: '2',
    title: 'Quem somos',
    text: 'Nosso grupo é composto pelos alunos do IFRN Guilherme, Afonso, Patricía, Jamile e Roberto',
    image: require('./assets/IF.png')
  },
  {
    key: '3',
    title: 'O que queremos',
    text: 'Queremos uma Parnamirim melhor!',
    image: require('./assets/parna.png')
  },
]

export default function TeladeRolagem() {
  const [showHome, setShowHome] = useState(false);
  const navigation = useNavigation();
  function renderSlides({ item }) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'cover',
            height: '73%',
            width: '100%',
          }}
        />
        <Text
          style={{
            paddingTop: 25,
            paddingBottom: 10,
            fontSize: 23,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: '#009CFF',
          }}>
          {item.title}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#b5b5b5',
            paddingHorizontal: 25,
            fontSize: 15,
          }}>
          {item.text}
        </Text>
      </View>
    );
  }

  function handleDone() {
    setShowHome(true);
  }
  function irpratelainicial(){
    navigation.navigate('Tela Inicial');
  }

  if (showHome) {
    irpratelainicial();
  } else {
    return (
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: '#009CFF',
          width: 30,
        }}
        renderNextButton={() => <Text style={{ fontSize: 20 }}>Próximo</Text>}
        renderDoneButton={() => <Text style={{ fontSize: 20 }}>Acessar!</Text>}
        onDone={handleDone}
      />
    );
  }
}
