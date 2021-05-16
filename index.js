import React, { useRef } from "react"
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  ScrollView,
  Modal,
} from "react-native"

const { width, height } = Dimensions.get("screen")

/**
 * Renders "carousel"
 */

export default function Karuselli({
  section1,
  section2,
  section3,
  colors,
  visible,
}) {
  /* If colors were not given, use fault value 'white' */
  if (!colors) {
    colors = ["#fff", "#fff", "#fff"]
  }

  const scrollX = useRef(new Animated.Value(0)).current

  /* Animated background color */
  const BackDrop = ({ scrollX }) => {
    const bg = scrollX.interpolate({
      inputRange: colors.map((_, i) => i * width),
      outputRange: colors.map((bg) => bg),
    })
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: bg, zIndex: -1 },
        ]}
      />
    )
  }

  /* Dot pagination showed at the bottom */
  const Pagination = ({ scrollX }) => {
    const slide = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [-width * 0.006, width * 0.124],
    })
    return (
      <View style={styles.pagination}>
        <Animated.View
          style={[
            styles.dot,
            {
              position: "absolute",
              height: 20,
              width: 20,
              backgroundColor: "#fff",
              transform: [{ translateX: slide }],
            },
          ]}
        />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    )
  }
  if (!section1 || !section2 || !section3) {
    var err = new Error("All three sections must be provided to 'Karuselli'")
    throw err
  }
  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" visible={!visible ? visible : true}>
        <BackDrop scrollX={scrollX} />
        <ScrollView
          horizontal
          style={styles.container}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <Animated.View style={styles.item}>
            <View style={styles.itemWrapper}>{section1}</View>
          </Animated.View>
          <Animated.View style={styles.item}>
            <View style={styles.itemWrapper}>{section2}</View>
          </Animated.View>
          <Animated.View style={styles.item}>
            <View style={styles.itemWrapper}>{section3}</View>
          </Animated.View>
        </ScrollView>
        <Pagination scrollX={scrollX} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  itemWrapper: {
    width: width * 0.85,
    height: height * 0.8,
  },
  pagination: {
    width: width * 0.3,
    height: height * 0.03,
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#0b0b0b",
    borderRadius: 26,
    width: 15,
    height: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
})
