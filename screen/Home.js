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

const Home = (props) => {

  return (
    <View style={styles.container}>
        <Text>Haloooo</Text>
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


export default Home;