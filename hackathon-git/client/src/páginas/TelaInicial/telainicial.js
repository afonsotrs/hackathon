import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

export default function TelaInicial(){
    const navigation = useNavigation();

    return(
        <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1515898698999-18f625d67499?ixid=MXwxNjc5NzV8MHwxfGFsbHx8fHx8fHx8&amp;ixlib=rb-1.2.1&amp;fm=jpg&amp;q=85&amp;fit=crop&amp;w=2560&amp;h=1920' }} 
        style={styles.backgroundImage}
        >
        <View style={styles.container}>
            
            <Animatable.View animation={'fadeInUp'} style={styles.formcontainer}>
                <View>
                    <Text style={styles.title}>PARNAMIRIM RUAS</Text>
                </View>
                <View>
                    <Text style={styles.text}>Contribua Para Uma Cidade mais</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.textbutton}>Inscreva-se com o e-mail</Text>
                </TouchableOpacity>
                <Text style={styles.textmid}>ou continue com</Text>
                <View>
                    <TouchableOpacity style={styles.buttongoogle}>
                        <Image
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        source={{
                            uri: 'https://tse1.mm.bing.net/th?id=OIP.EhTMbGiYfYzQnWLgjZaoJAHaHa&pid=Api&P=0&h=180'
                        }}
                        />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <View style={styles.footer}>
                <Text style={styles.textfooter}>Você já possui uma conta?</Text>
                <TouchableOpacity>
                    <Text style={styles.textfooterbutton} onPress={() => navigation.navigate('Login')}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    formcontainer:{
        flex:1,
        alignItems:'center',
        width:'100%',
        marginTop: '130%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        backgroundColor: '#3399FF',
        paddingEnd: 20,
        paddingStart:20
    },
    title:{
        marginTop:20,
        color: 'white',
        fontSize: 30
    },
    text:{
        marginTop: 10,
        color:'white',
        fontSize: 18
    },
    button:{
        backgroundColor: 'white',
        width: '80%',
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton:{
        fontSize: 18,
        color: '#3399FF'
    },
    backgroundImage:{
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    textmid:{
        marginTop:20,
        fontSize:17,
        color:'white'
    },
    buttongoogle:{
        backgroundColor: 'white',
        width: 150,
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
   },
   footer:{
        backgroundColor: '#0a5cb8',
        width:'100%',
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textfooter:{
        fontSize:17
    },
    textfooterbutton:{
        fontSize: 17,
        marginLeft:5,
        textDecorationLine: 'underline'
    }

})
