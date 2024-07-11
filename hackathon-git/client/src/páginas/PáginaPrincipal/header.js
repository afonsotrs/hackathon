import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>AlagaParnamirim</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop:30,
    marginLeft: 15,
  },
  headerText: {
    color: '#009CFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
