import React, { useRef } from 'react'
import { View, Text, FlatList, Dimensions, StyleSheet, Animated, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('screen')

/**
 * Renders "carousel" to show cards. 
 * Data needs to have; "header, subheader, content"
 */

export default function Karuselli({ data, cardColor, headerIcon, fontColor }) {

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRangeX = [(index - 1) * width, index * width, (index + 1) * width]
    const slideXTitle = scrollX.interpolate({
      inputRange: inputRangeX,
      outputRange: [width * 0.3, 0, -width * 0.3]
    })
    const slideXDesc = scrollX.interpolate({
      inputRange: inputRangeX,
      outputRange: [width * 0.8, 0, -width * 0.8]
    })
    return (
      <View style={[styles.item]}>
        <Animated.View style={[styles.card, { backgroundColor: cardColor }]}>
          <Animated.View style={[styles.header, { transform: [{ translateX: slideXTitle }] }]}>
            <View style={{ paddingLeft: width * .05 }}>
              {
                headerIcon &&
                headerIcon
              }
            </View>
            <Animated.Text style={[styles.headerText, { color: fontColor }]}>{item.header}</Animated.Text>
          </Animated.View>
          <View style={styles.content}>
            <Animated.View style={[styles.contentWrapper, { transform: [{ translateX: slideXDesc }] }]}>
              <ScrollView>
                <Text style={[styles.subheaderText, { color: fontColor }]}>{item.subheader}</Text>
                <Text style={{ color: fontColor }}>{item.content}</Text>
              </ScrollView>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        snapToAlignment={"start"}
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * .5
  },
  item: {
    width: width,
    height: height * .5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '70%',
    display: 'flex',
    borderRadius: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: width * .08,
    paddingLeft: width * .05
  },
  subheaderText: {
    fontSize: width * .05,
    marginBottom: height * .01
  },
  contentWrapper: {
    height: '90%',
    width: '90%',
  }
});