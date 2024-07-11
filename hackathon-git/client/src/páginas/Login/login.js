import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import Constants from 'expo-constants';


export default function Login() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const logarnodb = async (values) => {
        try {
            const response = await Axios.post('http://192.168.0.4:3002/login', {
                email: values.email,
                password: values.password,
            });
            console.log(response);
            if(response.data.msg === 'Usuário logado'){
                navigation.navigate('Página Principal');   
            }else if( response.data.msg === 'Senha incorreta' || response.data.msg === 'Usuário não registrado!'){
                alert(response.data.msg)
            }
        } catch (error) {
            alert("Erro ao tentar logar. Tente novamente.");
            console.error(error);
        }
    };

    const validarlogin = yup.object().shape({
        email: yup.string().email("Não é um email").required("Este campo é obrigatório"),
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este campo é obrigatório"),
    });

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
                <Text style={styles.titulo}>Entrar</Text>
            </View>
            <Animatable.View animation={'fadeInUp'} style={styles.form}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validarlogin}
                    onSubmit={values => {
                        logarnodb(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.emailarea}>
                                <Text style={styles.texto}>Email</Text>
                                <TextInput
                                    placeholder="Seu e-mail"
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.alertmsg}>{errors.email}</Text>
                                )}
                            </View>
                            <View>
                                <Text style={styles.texto}>Senha</Text>
                                <View style={styles.passwordcontainer}>
                                    <TextInput
                                        style={styles.inputpassword}
                                        placeholder="Insira ao menos 8 caracteres"
                                        secureTextEntry={!passwordVisible}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        <MaterialIcons name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="grey" />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.alertmsg}>{errors.password}</Text>
                                )}
                            </View>
                            <TouchableOpacity style={styles.buttonentrar} onPress={handleSubmit}>
                                <Text style={styles.textbnt}>Entrar</Text>
                            </TouchableOpacity>
                            <Text style={styles.textmid}>ou continue com</Text>
                            <View style={styles.logarcomgoogle}>
                                <TouchableOpacity style={styles.googlebnt}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25
                                        }}
                                        source={{
                                            uri: 'https://tse1.mm.bing.net/th?id=OIP.EhTMbGiYfYzQnWLgjZaoJAHaHa&pid=Api&P=0&h=180'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3399FF'
    },
    buttonback: {
        marginLeft: 20,
        marginTop: 50,
        width: 50,
        height: 50
    },
    titulo: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
    },
    form: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '8%',
        paddingEnd: '8%'
    },
    texto: {
        marginTop: 15,
        fontSize: 20,
        color: 'white'
    },
    input: {
        marginTop: 5,
        backgroundColor: 'white',
        height: 40,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 15
    },
    buttonentrar: {
        backgroundColor: 'white',
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center'
    },
    textbnt: {
        fontSize: 19,
        textAlign: 'center',
        color: '#3399FF'
    },
    logarcomgoogle: {
        alignItems: 'center',
        marginTop: 10
    },
    googlebnt: {
        backgroundColor: 'white',
        width: 150,
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    passwordcontainer: {
        marginTop: 5,
        backgroundColor: 'white',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputpassword: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10
    },
    eyeIcon: {
        paddingHorizontal: 10
    },
    textmid: {
        marginTop: 20,
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    alertmsg: {
        color: 'red'
    }
});