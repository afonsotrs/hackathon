import React from "react";
import { SafeAreaView, } from "react-native";
import ListaHorizontal from './LH';

import image1 from './assets/ABC3.png';
import image2 from './assets/flamengo.png';
import image3 from './assets/silva.png';



const Home = () => {
    const data = [
        image1,
        image2,
        image3,
        '#FFB399',
        '#FF33FF',
        '#FFFF99',
        '#00B3E6',
        '#E6B333',
        '#3366E6',
        '#999966',
        '#99FF99',
        '#834D4D',
    ];
    return (
        <SafeAreaView>
            <ListaHorizontal data={data} />
        </SafeAreaView>
    );
};

export default Home;
