import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../páginas/Login/login.js';
import Cadastro from '../páginas/Cadastro/cadastro.js';
import TelaInicial from "../páginas/TelaInicial/telainicial.js";
import PaginaPrincipal from "../páginas/PáginaPrincipal/paginaprincipal.js";
import Formulario from '../páginas/Formulário/formulario.js'

const Stack = createNativeStackNavigator();

export default function Rotas(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Tela Inicial"
            component={TelaInicial}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Página Principal"
            component={PaginaPrincipal}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Formulário"
            component={Formulario}
            options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}