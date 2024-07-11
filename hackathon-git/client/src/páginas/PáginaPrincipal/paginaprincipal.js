import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PaginaPrincipal() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Formulário')}>
                <Text>
                    ir para o formulario
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});