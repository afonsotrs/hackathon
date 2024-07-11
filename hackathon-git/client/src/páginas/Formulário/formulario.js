import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Alert, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function PaginaPrincipal() {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

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

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.buttonback} onPress={() => navigation.navigate('Tela Inicial')}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/60/60775.png'
                    }}
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </TouchableOpacity>
        </View>
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
            <Text style={styles.text}>Clique no mapa para adicionar um marcador</Text>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity>
                <Text>Inícil</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Perfil</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{
        height:150
    },
    buttonback: {
        marginLeft: 20,
        marginTop: 50,
        width: 50,
        height: 50
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.7,
    },
    form: {
        padding: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});