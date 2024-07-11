import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Formulario() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSearch = async () => {
    try {
      let geocode = await Location.geocodeAsync(search);
      if (geocode.length > 0) {
        let { latitude, longitude } = geocode[0];
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert('Endereço não encontrado');
      }
    } catch (error) {
      Alert.alert('Erro ao procurar o endereço');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            placeholder="Procurar rua"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/482/482631.png'
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.mapview}>
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation={true}
              onRegionChangeComplete={setRegion}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={"Você está aqui"}
                />
              )}
            </MapView>
          </View>
          <View style={styles.form}>
            <Text style={styles.text}>Marque no mapa a rua e relate o problema no formulário abaixo</Text>
            <TextInput
              placeholder="Seu e-mail"
              style={styles.input}
            />
            <TextInput
              placeholder="Descreva o problema"
              style={styles.input}
              multiline
            />
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                <Text>Carregar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.imageButton}>
                <Text>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
            {image && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
            <TouchableOpacity style={styles.bntenviar}>
                <Text style={styles.textbnt}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Página Principal')}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/25/25694.png' }} style={styles.footerIcon} />
            <Text>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Formulário')}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/447/447031.png' }} style={styles.footerIcon} />
            <Text>Formulário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Perfil')}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png' }} style={styles.footerIcon} />
            <Text>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  buttonback: {
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
  },
  mapview: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  form: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  imageButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  bntenviar: {
    backgroundColor: '#3399FF',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbnt: {
    fontSize: 18,
    color: 'white',
  },
});
