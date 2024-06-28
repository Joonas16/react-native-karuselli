import React, { useRef, useState, useCallback } from "react"
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Modal,
  FlatList,
} from "react-native"

const { width, height } = Dimensions.get("screen")

/**
 * Renders "carousel"
 */

export default function Karuselli({ colors, visible, views, dotColor }) {
  /* If colors were not given, use default value 'white' */
  if (!colors) {
    colors = ["#fff", "#fff"]
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
  const Pagination = ({ scrollX, index }) => {
    const scale = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [0.5, 1.4, 0.5],
    })
    return (
      <View
        style={[
          styles.pagination,
          {
            width: width * 0.06 * views.length,
            left: width * 0.5 - (width * 0.06 * views.length) / 2,
          },
        ]}
      >
        {views.map((item, i) => {
          return (
            <Animated.View
              key={item.key}
              style={[
                styles.dot,
                {
                  transform: [{ scale: i === index ? scale : 1 }],
                  opacity: i === index ? 1 : 0.6,
                  backgroundColor: dotColor,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <Animated.View style={styles.item}>
        <View style={styles.itemWrapper}>{item}</View>
      </Animated.View>
    )
  }

  // INDEX HANDLING STARTS
  const [currentIndex, setCurrentIndex] = useState(0)
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index)
  }, [])
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }
  // INDEX HANDLING ENDS

  if (!views) {
    console.log("Add views to 'Karuselli'")
    return <View style={{ flex: 1 }} />
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" visible={!visible ? visible : true}>
        <BackDrop scrollX={scrollX} />
        <FlatList
          horizontal
          style={styles.container}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          data={views}
          renderItem={renderItem}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
        <Pagination scrollX={scrollX} index={currentIndex} />
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
    height: height * 0.03,
    position: "absolute",
    bottom: height * 0.05,
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
  biggerDot: {
    position: "absolute",
    height: 20,
    width: 20,
    borderRadius: 26,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
})
