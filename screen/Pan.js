import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";


const Home = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const anim = useRef(new Animated.Value(100)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gesture) => {
        console.log(gesture);
        console.log(pan)
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({
          x: 0,
          y: 0
        });
      },

      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        
      ),

      
      onPanResponderRelease: () => {
        Animated.parallel([
          
          Animated.spring(pan, {
            toValue: 0,
          })
        ]).start();
        
      }

    })
  ).current;



  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={[{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }]}
        {...panResponder.panHandlers}
      >
        <Animated.View style={{ height: anim, width: anim, backgroundColor: "blue", borderRadius: 5 }} />
      </Animated.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    
  }
});

export default Home;