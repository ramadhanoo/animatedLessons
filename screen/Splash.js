import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  Easing,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native'

const { width, height } = Dimensions.get("window");

const Splash = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const putar = useRef(new Animated.Value(1)).current;
  const naik = useRef(new Animated.Value(1)).current;
  const active = useRef(new Animated.Value(-500)).current
  const cek = useRef(new Animated.Value(0)).current


  const fadeIn = () => {
    Animated.parallel([

      Animated.timing(putar, {
        toValue: 0,
        duration: 1000,
      }),

    ]).start(() => {
      Animated.sequence([
        Animated.timing(naik, {
          toValue: -90,
          duration: 500,
        }),
        Animated.timing(fadeAnim, {
          toValue: 200,
          duration: 1300,
        }),
        Animated.timing(active, {
          toValue: 5,
          duration: 500,
          easing: Easing.bounce
        }),
      ]).start(() => {
          setTimeout(() => {
            props.navigation.replace("Home")
          }, 1000);
      });
    })
  };

  const tambah = fadeAnim.interpolate({
    inputRange: [0, 50, 200],
    outputRange: [0, 60, 4000],
  })

  console.log(tambah)

  useEffect(() => {
    fadeIn();
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[{ width: 100, height: fadeAnim, backgroundColor: '#222831', justifyContent:'center', alignItems: 'center', borderRadius: 120, justifyContent: 'center', alignItems: 'center' }, { width: tambah, height: tambah }, { transform: [{ translateY: naik }, { rotateZ: putar }] }]}>
        <Image source={require('../images/macan.png')} style={[{ width: 200, height: 200 }]} />
      </Animated.View>
      <Animated.View style={[{ backgroundColor: 'transparent',  width: width, height: 100, position: 'absolute', top: height / 1.8, left: 0, right: 0,  alignItems: 'center' }, { transform: [{ translateX: active }]}]}>
        <ActivityIndicator size="large" color="#FFF" />
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})


export default Splash;