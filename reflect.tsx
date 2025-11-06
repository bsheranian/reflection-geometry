// import React, { useEffect } from "react";
// import { Animated, StyleSheet, Text, View } from "react-native";

// function App() {
//   const BAR_HEIGHT = 500;
//   const width = 100;
//   const height = 300;

//   // const additional = 0;
//   const additional = (BAR_HEIGHT * Math.sqrt(1 / 2)) / 2;
//   const barWidth = (width + height) / Math.sqrt(2);
//   const topZ = (height + width) / 4 - height / 2;
//   const leftZ = barWidth / 2 - topZ;

//   const top = topZ + additional + BAR_HEIGHT / 2;
//   const left = leftZ + additional;

//   const translate = new Animated.Value(0);

//   useEffect(() => {
//     Animated.timing(translate, {
//       toValue: 1,
//       useNativeDriver: true,
//       duration: 2000
//     }).start();
//   });

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <View style={{ width, height, backgroundColor: "grey" }}>
//         <Animated.View
//           style={{
//             height: BAR_HEIGHT,
//             width: barWidth,
//             left: -left,
//             top: -top,
//             backgroundColor: "#ff000030",
//             transform: [
//               { rotate: "-45deg" },
//               {
//                 translateY: translate.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0, barWidth + BAR_HEIGHT]
//                 })
//               }
//             ]
//           }}
//         />
//       </View>
//       <Text>
//         {barWidth} {top} {left} {additional}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   app: {
//     marginHorizontal: "auto",
//     maxWidth: 500
//   },
//   logo: {
//     height: 80
//   },
//   header: {
//     padding: 20
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: "1.5rem",
//     marginVertical: "1em",
//     textAlign: "center"
//   },
//   text: {
//     lineHeight: "1.5em",
//     fontSize: "1.125rem",
//     marginVertical: "1em",
//     textAlign: "center"
//   },
//   link: {
//     color: "#1B95E0"
//   },
//   code: {
//     fontFamily: "monospace, monospace"
//   }
// });

// const buttonStyles = StyleSheet.create({
//   button: {
//     backgroundColor: "#2196F3",
//     borderRadius: 2
//   },
//   text: {
//     color: "#fff",
//     fontWeight: "500",
//     padding: 8,
//     textAlign: "center",
//     textTransform: "uppercase"
//   }
// });

// export default App;


import React, { useEffect } from "react";
import { Animated, View } from "react-native";

function App() {
  const BAR_HEIGHT = 100;
  const width = 200;
  const height = 450;

  const sin = (degrees) => Math.sin((degrees * Math.PI) / 180);

  // new
  const x = 85;
  const leftHalf = height * (sin(x) / sin(90));
  const rightHalf = width * (sin(90 - x) / sin(90));
  const barWidth = leftHalf + rightHalf;
  const additional = ((BAR_HEIGHT / 2) * sin(90 - x)) / sin(90);
  const topZ = ((barWidth / 2 - leftHalf) * sin(x)) / sin(90);
  const top = topZ + additional + BAR_HEIGHT / 2;
  const left =
    barWidth / 2 -
    ((barWidth / 2 - leftHalf) * sin(90 - x)) / sin(90) +
    ((BAR_HEIGHT / 2) * sin(x)) / sin(90);
  // og
  // const barWidth = (width + height) / Math.sqrt(2);
  // const additional = BAR_HEIGHT / Math.sqrt(2) / 2;
  // const top = (width - height) / 4 + additional + BAR_HEIGHT / 2;
  // const left = barWidth / 2 - (width - height) / 4 + additional;

  const fDeg = (Math.atan(height / width) / Math.PI) * 180;
  const hypotenuse = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
  const distToTravel = (hypotenuse * sin(fDeg + x)) / sin(90);

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          delay: 1000,
          duration: 2000
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
          delay: 1000,
          duration: 2000
        })
      ])
    ).start();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#adadad"
      }}
    >
      <View
        style={{
          width,
          height,
          backgroundColor: "#89CFF0"
          // overflow: "hidden"
        }}
      >
        <Animated.View
          style={{
            height: BAR_HEIGHT,
            width: barWidth,
            left: -left,
            top: -top,
            backgroundColor: "#ffffff30",
            transform: [
              { rotate: `-${x}deg` },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, distToTravel + BAR_HEIGHT]
                })
              }
            ]
          }}
        />
      </View>
    </View>
  );
}

export default App;
