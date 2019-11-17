import React, { Component } from "react";
import {
  SafeAreaView, StyleSheet, Dimensions, View, Platform, Text
} from "react-native";
import * as shape from "d3-shape";
import Svg, {
  Path,
  Circle
} from 'react-native-svg';
import Animated from "react-native-reanimated";
import { interpolatePath } from "react-native-redash";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const width = Dimensions.get("window").width;
const height = 300;
const tabs = [
  {
    name: "A",
    routerName: "HomeScreen"
  },
  {
    name: "B",
    routerName: "SearchScreen"
  },
  {
    name: "C",
    active: true,
    routerName: "FavoritesScreen"
  },
  {
    name: "D",
    routerName: "ProfileScreen"
  },
  {
    name: "E",
    routerName: "ProfileScreen2"
  },
];
const backgroundColor = "white";
//hideous
const getPath1 = (eye, m = 0) => {
  let position = 1;
  switch (eye) {
    case 'left':
      position = 1.5
      break;
    default:
      position = 4.5
      break;
  }
  const w = (0);
  // const w = (50 * position);

  //position eye
  const left = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasisClosed)([
    { x: 60 + w, y: 40 },
    { x: 50 + w, y: 40 },
    { x: 60 + w, y: 35 },
  ]);
  const right = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasisClosed)([
    // right
    { x: 100 + w, y: eye === 'left' ? 0 : 10 },
    { x: 100 + w, y: eye === 'left' ? 0 : 10 },
    { x: 50 + w, y: 15 },
    // curve
    { x: 10 + w, y: eye === 'left' ? 10 : 0 },
    { x: 14 + w, y: eye === 'left' ? 15 : 0 },
    // side left
    { x: 10 + w, y: 10 },
    { x: 55 + w, y: 120 - m },
  ]);
  return `${left} ${right} `;
};
//ok
const getPath = (eye, m = 0) => {
  let position = 1;
  switch (eye) {
    case 'left':
      position = 1.5
      break;
    default:
      position = 4.5
      break;
  }
  // const w = (50 * position);
  const w = (0);
  //position eye
  const left = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasisClosed)([
    { x: eye === 'left' ? 60 + w : 50 + w, y: 20 },
    { x: eye === 'left' ? 50 + w : 40 + w, y: 20 },
    { x: eye === 'left' ? 60 + w : 50 + w, y: 25 },
  ]);
  const right = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasisClosed)([
    // right
    { x: 100 + w, y: 15 },
    { x: 100 + w, y: 15 },
    { x: 100 + w, y: eye === 'left' ? 0 : 10 },
    // { x: 100 + w, y: eye === 'left' ? 0 : 10 },
    // curve
    { x: eye === 'left' ? 10 + w : 10 + w, y: eye === 'left' ? 12 : 0 },
    { x: eye === 'left' ? 10 + w : 0 + w, y: eye === 'left' ? 12 : 20 },
    // side left
    // { x: 0 + w, y: 15 },
    // { x: 0 + w, y: 15 },
    // { x: eye === 'left' ? 5 + w : 35 + w, y: eye === 'left' ? 35 : 40 },
    { x: eye === 'left' ? 35 + w : 70 + w, y: eye === 'left' ? 60 - m : 50 },
    { x: eye === 'left' ? 85 + w : 90 + w, y: eye === 'left' ? 35 : 40 },
  ]);
  return `${left} ${right} `;
};
const getMouth = (eye) => {
  const mouth = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
    { x: 150, y: eye === 'face1' ? 220 : 205 },
    { x: 170, y: eye === 'face1' ? 200 : 210 },
    { x: 190, y: eye === 'face1' ? 210 : 213 },
    { x: 210, y: eye === 'face1' ? 190 : 215 },
    { x: 220, y: eye === 'face1' ? 195 : 217 },
    { x: 235, y: eye === 'face1' ? 205 : 218 },
    { x: 250, y: eye === 'face1' ? 220 : 220 },
  ]);
  return `${mouth}`
}
class App extends React.Component {
  value = new Animated.Value(0);
  state = {
    d1: getPath('left'),
    daux: getPath1('left'),
    d2: getPath('right'),
    d3: getMouth('face1')
  };
  componentDidMount = () => {
    const self = this
    let num = 0
    // const time = setInterval(() => {
    //   self.setState({
    //     d: getPath('left', num++),
    //     d2: getPath('right', num++),
    //     // d3: getMouth()
    //   });
    //   if (num === 50) {
    //     clearInterval(time)
    //   }
    // }, 10)
  }
  render() {
    const { value, state: { d1, d2, d3, daux } } = this;
    const d = interpolatePath(slider, {
      // inputRange: [0, width, width * 2],
      outputRange: [d, daux]
    });
    console.log('d :', d1, daux);
    return (
      <View style={styles.container}>
        <View {...{ width }} >
          <AnimatedSvg width={(width)} {...{ height }}>
            <AnimatedPath fill={backgroundColor} strokeWidth="3" stroke="black"  {...{ d }} />
            {/* <Path strokeWidth="3" stroke="black"  {...{ d }} /> */}
            {/* <Path fill={backgroundColor} strokeWidth="3" stroke="black"  {...{ d: d2 }} /> */}
            {/* <Path strokeWidth="3" stroke="black"  {...{ d: d2 }} /> */}
            <Path fill='#ddc7f3' strokeWidth="3" stroke="black"  {...{ d: d3 }} />
          </AnimatedSvg>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor,
  // },
  container: {
    flex: 1,
    backgroundColor: "rgb(221,199,243)",
    justifyContent: "center",
    alignItems: 'center',
  },
});

export default App;