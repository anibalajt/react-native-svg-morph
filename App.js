import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';

import { interpolate } from 'flubber';
import { tween, easing } from 'popmotion';

const { width, height } = Dimensions.get('screen');
import Svg, { Path, Circle } from 'react-native-svg';;

const fill = "#fff";
const types = ['angry', 'sad', 'ok', 'happy'];
const emojis = ['😠', '😔', '😐', '🙂']
const PATHS = {
  "angry": {
    "background": "#ec3131",
    "left": "M1.49 21.94L3.73 23.45L8.41 24.83L15.54 26.62L24.58 28.58L34.16 30.52L40.99 31.79L41.13 29.34L40.94 25.56L37.47 21.41L33.48 17.56L28.97 14.27L22.33 11.37L16.81 9.5L13.57 9.66L8.84 12.35L4.72 16.36L2.47 19.99L1.49 21.94Z",
    "right": "M83.59 30.86L91.4 29.84L101.64 28.21L109.71 26.63L115.36 25.67L117.76 24.25L117.69 21.82L115.98 18.62L112.33 13.85L107.38 10.74L102.52 11.14L96.61 12.38L89.92 15.27L84.35 19.21L81.2 22.81L78.84 25.58L78.11 28.31L78.45 31L83.59 30.86Z",
    "mouth": "M40.29 73.09L43.85 70.82L48.44 69.12L53.36 67.24L58.05 66.48L59.88 66.48L63.66 66.48L65.11 66.78L69.61 68.4L71.06 69.12L72.05 69.78L74.32 70.82L70.73 68.4L64.57 66.14L59 66.14L52.63 66.95L47.26 68.89L42.68 70.82L39.1 73.09L36.32 75.67L40.29 73.09Z"
  },
  "sad": {
    "background": "#f79830",
    "left": "M0.36 7.75L0 6.49L0.81 5.68L2.61 5.5L5.22 5.68L9.1 5.68L12.7 6.13L16.67 5.68L19.46 5.68L23.34 5.23L26.76 4.69L29.28 4.06L31.63 3.61L34.24 2.97L36.58 2.43L38.75 1.8L40.73 1.26L42.35 0.81L43.88 0.36L45.15 0L45.87 0.36L46.32 1.26L45.87 3.61L45.15 6.13L43.88 9.19L42.8 12.08L41.72 14.96L40.28 18.03L39.2 21.18L37.94 24.42L36.31 27.4L35.14 29.92L33.52 32.81L32.08 35.15L30.82 37.13L29.28 39.39L27.48 40.92L25.95 42.45L24.06 43.35L22.35 43.62L20.45 43.08L18.65 42.09L16.67 40.47L15.05 38.48L13.24 36.23L11.62 33.71L10.18 31.27L8.65 27.85L7.3 25.06L6.03 22.44L5.22 20.19L3.6 16.4L2.16 12.8L0.99 9.46L0.36 7.75Z",
    "right": "M119.63 7.75L120 6.49L119.18 5.68L117.38 5.5L114.77 5.68L110.89 5.68L107.29 6.13L103.32 5.68L100.53 5.68L96.65 5.23L93.23 4.69L90.71 4.06L88.36 3.61L85.75 2.97L83.41 2.43L81.24 1.8L79.26 1.26L77.64 0.81L76.11 0.36L74.84 0L74.12 0.36L73.67 1.26L74.12 3.61L74.84 6.13L76.11 9.19L77.19 12.08L78.27 14.96L79.71 18.03L80.79 21.18L82.05 24.42L83.68 27.4L84.85 29.92L86.47 32.81L87.91 35.15L89.17 37.13L90.71 39.39L92.51 40.92L94.04 42.45L95.93 43.35L97.65 43.62L99.54 43.08L101.34 42.09L103.32 40.47L104.94 38.48L106.75 36.23L108.37 33.71L109.81 31.27L111.34 27.85L112.7 25.06L113.96 22.44L114.77 20.19L116.39 16.4L117.83 12.8L119 9.46L119.63 7.75Z",
    "mouth": "M44.01 69.7L48.36 68.28L52.21 67.85L56.23 68.28L59.91 68.28L63.26 68.85L65.94 69.7L67.78 70.7L69.79 71.69L72.3 73.4L75.14 76.67L76.32 76.67L75.14 75.1L73.8 73.4L72.3 71.69L70.29 70.41L68.28 69.27L66.61 68.28L63.93 67.85L61.42 67.14L58.57 67.14L54.55 67.14L49.53 67.14L45.85 68.28L41.33 69.7L38.32 71.69L44.01 69.7Z"
  },
  "ok": {
    "background": "#00bcd4",
    "left": "M1.7 20.46L3.95 18.95L8.62 17.57L15.75 15.78L24.79 13.81L34.37 11.88L41.2 10.61L41.34 13.06L41.15 16.84L37.68 20.99L33.69 24.84L29.19 28.12L22.54 31.02L17.02 32.9L13.78 32.73L9.05 30.05L4.93 26.04L2.68 22.4L1.7 20.46Z",
    "right": "M82.93 10L90.74 11.03L100.98 12.66L109.05 14.24L114.7 15.2L117.09 16.62L117.03 19.05L115.32 22.25L111.67 27.02L106.72 30.13L101.86 29.73L95.94 28.48L89.26 25.6L83.69 21.66L80.54 18.05L78.18 15.29L77.45 12.56L77.79 9.86L82.93 10Z",
    "mouth": "M47.37 72.23L68.67 72.23L77.55 72.23L72.64 73.57L65.05 73.57L57.32 73.57L50.76 73.57L42.28 72.23L36.32 70.89L47.37 72.23Z"
  },
  "happy": {
    "background": "#bbe65f",
    "left": "M38.37 21.45C38.37 32.61 31.39 41.67 22.79 41.67C14.19 41.67 7.21 32.61 7.21 21.45C7.21 10.29 14.19 1.23 22.79 1.23C31.39 1.23 38.37 10.29 38.37 21.45Z",
    "right": "M112.5 20.83C112.5 31.99 105.52 41.05 96.92 41.05C88.32 41.05 81.34 31.99 81.34 20.83C81.34 9.68 88.32 0.62 96.92 0.62C105.52 0.62 112.5 9.68 112.5 20.83Z",
    "mouth": "M42.29 69.72L45.85 71.99L50.44 73.69L55.36 75.57L60.05 76.32L61.88 76.32L65.66 76.32L67.11 76.03L71.61 74.41L73.06 73.69L74.05 73.03L76.32 71.99L72.73 74.41L66.57 76.67L61 76.67L54.63 75.86L49.26 73.92L44.68 71.99L41.1 69.72L38.32 67.14L42.29 69.72Z"
  },
};
const interpolatePaths = (type, eye_left, eye_right, mouth, background, setEye_left, setEye_right, setMouth, setBackground) => {
  const interpolator = interpolate(eye_left, PATHS[type]["left"], { maxSegmentLength: 2 });
  const interpolator_right = interpolate(eye_right, PATHS[type]["right"], { maxSegmentLength: 2 });
  const interpolator_mouth = interpolate(mouth, PATHS[type]["mouth"], { maxSegmentLength: 2 });
  tween({
    duration: 400,
    ease: easing.easeInOut,
    from: { i: 0, background: background },
    to: { i: 1, background: PATHS[type].background }
  })
    .pipe(({ i, background }) => ({ left: interpolator(i), right: interpolator_right(i), mouth: interpolator_mouth(i), background }))
    .start(({ left, right, mouth, background }) => {
      setEye_left(left)
      setEye_right(right)
      setMouth(mouth)
      setBackground(background)
    })
}
const onResponderMove = ({ nativeEvent }) => {
  console.log('onResponderMove :', nativeEvent);
}
export default () => {
  const [eye_left, setEye_left] = useState(PATHS.sad.left)
  const [eye_right, setEye_right] = useState(PATHS.sad.right)
  const [mouth, setMouth] = useState(PATHS.sad.mouth)
  const [background, setBackground] = useState(PATHS.sad.background)

  return (
    <View style={[styles.container, { backgroundColor: background }]}
      onResponderMove={onResponderMove}
    >
      <View style={styles.headings}>
        <Text style={styles.heading}>How you been?</Text>
      </View>
      <View style={styles.svgWrapper}>
        <Svg width={width} height={height / 4} viewBox={`0 0 ${width / 3.5} 110`} style={styles.svgContainer}>
          <Path d={eye_left} fill={fill} stroke-width="3" stroke="#000" />
          <Path d={eye_right} fill={fill} stroke-width="3" stroke="#000" />
          <Path d={mouth} fill={'black'} stroke-width="1" stroke="#000" />
          {/* <Path d="M21.01 21.76C21.01 22.96 21.76 23.94 22.68 23.94C23.6 23.94 24.35 22.96 24.35 21.76C24.35 20.56 23.6 19.58 22.68 19.58C21.76 19.58 21.01 20.56 21.01 21.76Z" />
          <Path d="M95.7 20.79C95.7 21.99 96.45 22.96 97.37 22.96C98.3 22.96 99.05 21.99 99.05 20.79C99.05 19.59 98.3 18.61 97.37 18.61C96.45 18.61 95.7 19.59 95.7 20.79Z" /> */}
          <Circle fill="black" r="2" cx="22" cy="21"></Circle>
          <Circle fill="black" r="2" cx="97" cy="21"></Circle>
        </Svg>
        <View style={styles.feedbackWrapper}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity key={types[index]} onPress={() => interpolatePaths(types[index], eye_left, eye_right, mouth, background, setEye_left, setEye_right, setMouth, setBackground)}>
              <Text style={{ paddingHorizontal: 20, fontSize: 40 }}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  feedbackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 55,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: width * .9
  },
  headings: {
    flex: .2,
    justifyContent: "center"
  },
  heading: {
    color: "#000",
    fontSize: 42,
    lineHeight: 42,
  },
  svgContainer: {
    marginBottom: 40,
  },
  svgWrapper: {
    flex: .6,
    alignItems: "center",
    justifyContent: "center"
  }
});