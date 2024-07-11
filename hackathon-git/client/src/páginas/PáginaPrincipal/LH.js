import React from "react";
import { Dimensions, FlatList, View, Image,Text, } from "react-native";
const { width } = Dimensions.get('window');

const ListaHorizontal = ({ data }) => {
    return (
        <View>
            <Text style={{
                fontSize:30,
            }}>
                Notícias
            </Text>
            <FlatList
                data={data}
                keyExtractor={(item) => String(item)}
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(data.length)].map(
                    (x, i) => i * (width * 0.8 - 40) + (i - 1) * 40,
                )}
                horizontal
                snapToAlignment={'start'}
                scrollEventThrottle={16}
                decelerationRate="fast"
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: item,
                            height: width / 2.6,
                            width: width * 0.8 - 20,
                            marginTop: 50,
                            marginHorizontal: 10,
                            borderRadius: 12,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            source={item}
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default ListaHorizontal;
