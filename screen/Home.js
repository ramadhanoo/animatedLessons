import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Dimensions, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity } from "react-native";
import { event } from "react-native-reanimated";
import { Mov } from '../data/Movie';
import Svg, { Rect } from 'react-native-svg';
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Backdrop = ({ movies, scrollX }) => {
  return(
    <View style={{ position: 'absolute', width: width, height: BACKDROP_HEIGHT }}>
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => {
          if(!item.backdrop) {
            return null
          }

          const inputRange = [
            (index -2) * ITEM_SIZE,
            (index - 1)  * ITEM_SIZE 
          ]

          const translateY = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [-width, 0]
          })

          return(
            <MaskedView style={{ position: 'absolute' }}
              maskElement={
                <AnimatedSvg style={{ transform: [{ translateX: translateY }] }} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                  <Rect x='0' y='0' width={width} height={height} fill={"green"}/>
                </AnimatedSvg>
              }
            >
              <Image source={{ uri: item.backdrop }}  style={{ width: width, height: BACKDROP_HEIGHT, resizeMode: 'cover'}} />
            </MaskedView>
          )
        }}
      />
      <LinearGradient colors={['transparent', '#fff']} style={{ width: width, height: BACKDROP_HEIGHT, position: 'absolute', bottom: 0 }}>

      </LinearGradient>
    </View>
  )
}

const Home = ({ navigation, props }) => {
  //const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  //setMovies([{ key: 'empty-left' }, ...Mov, { key: 'empty-right' }]);
  const movies = [{ key: 'left-spacer' }, ...Mov, { key: 'right-spacer' }]

  console.log(Mov)

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        bounces={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center', backgroundColor: 'transparent' }}
        renderItem={({ item, index }) => {
          console.log(index)
          if (!item.cover) {
            return (
              <View style={{ width: EMPTY_ITEM_SIZE, backgroundColor: 'transparent', height: 100 }}></View>
            )
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          
          console.log(inputRange)

          const translateY = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [140, 50, 140]
          })
          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View style={{ alignItems: 'center', backgroundColor: '#fff', borderRadius: 34, marginHorizontal: SPACING, padding: SPACING * 2, marginTop: 10, transform: [{ translateY: translateY }] }}>
                <Image source={{ uri: item.cover }} style={{ width: '100%', height: ITEM_SIZE * 1.2, resizeMode: 'cover', borderRadius: 24, margin: 0, marginBottom: 10, backgroundColor: '#dcdcdc' }} />
                <Text style={{ fontSize: 24, fontWeight: '700' }} numberOfLines={1}>{item.judul}</Text>
                <View style={{ width: '100%', height: 25, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 0, paddingRight: 0, marginTop: 10 }}>
                  <TouchableOpacity style={{ marginLeft: 20, width: '40%', height: '100%', borderColor: '#dcdcdc', borderWidth: 1, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#808080' }}>{item.genre}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 20, width: '40%', height: '100%', borderColor: '#dcdcdc', borderWidth: 1, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#808080' }}>{item.kategori}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'center' }} numberOfLines={3}>{item.deskripsi}</Text>
              </Animated.View>
            </View>
          )

        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default Home;