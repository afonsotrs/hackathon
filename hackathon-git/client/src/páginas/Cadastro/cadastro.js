import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as yup from "yup";
import * as Animatable from 'react-native-animatable';
import Axios from 'axios';

export default function Cadastro() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const cadastrarnodb = async (values) => {
        try {
            const response = await Axios.post('http://192.168.0.4:3002/cadastro', {
                nome: values.nome,
                email: values.email,
                password: values.password,
            });
            alert(response.data.msg);
            console.log(response);
        } catch (error) {
            alert("Erro ao tentar cadastrar. Tente novamente.");
            console.error(error);
        }
    };



    const validarcadastro = yup.object().shape({
        nome: yup.string().required("Este campo é obrigatório"),
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
                <Text style={styles.title}>Crie uma Conta</Text>
            </View>
            <Animatable.View animation={'fadeInUp'} style={styles.formcontainer}>
                <Formik
                    initialValues={{ nome: '', email: '', password: '' }}
                    validationSchema={validarcadastro}
                    onSubmit={values => {
                        cadastrarnodb(values);
                        // console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text style={styles.titleform}>Nome</Text>
                            <TextInput
                                placeholder="Insira seu nome"
                                style={styles.input}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                            />
                            {touched.nome && errors.nome && (
                                <Text style={styles.alertmsg}>{errors.nome}</Text>
                            )}

                            <Text style={styles.titleform}>E-mail</Text>
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

                            <Text style={styles.titleform}>Senha</Text>
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

                            <TouchableOpacity style={styles.buttonentrar} onPress={handleSubmit}>
                                <Text style={styles.textbutton}>Inscreva-se</Text>
                            </TouchableOpacity>
                            <Text style={styles.textmid}>ou continue com</Text>
                            <View style={styles.viewbutton}>
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
                        </View>
                    )}
                </Formik>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3399FF',
        flex: 1
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    },
    formcontainer: {
        paddingStart: '8%',
        paddingEnd: '8%'
    },
    buttonback: {
        marginLeft: 20,
        marginTop: 50,
        width: 50,
        height: 50
    },
    titleform: {
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
    textbutton: {
        fontSize: 19,
        textAlign: 'center',
        color: '#3399FF'
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
    textmid:{
        marginTop:20,
        fontSize:17,
        color:'white',
        textAlign:'center'
    },
    viewbutton:{
        alignItems:'center'
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
    alertmsg: {
        color: 'red',
        fontSize: 14,
        marginTop: 5
    }
});