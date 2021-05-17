# **React native karuselli**

![gif](https://media.giphy.com/media/6QlOhEMYqfxHBiLDDr/giphy.gif)

### Swipeable component with paging.

## Installation

> npm install rn-karuselli

> yarn add rn-karuselli

## Usage

Karuselli works as horizontal FlatList. You can use it as it is or as modal

_Add a "key" props for each view_

```js
<Karuselli
  views={[<Landing key={0} />, <SignIn key={1} />, <Next key={2} />]}
  colors={colors}
  dotColor={"#d3d3d3"}
/>
```

**As modal**:

```js
function App() {
  const [visible, setVisible] = useState(true)
  const handleModalClose = () => {
    setVisible(!visible)
  }

  const Landing = () => {
    return (
      <View>
        <Text>Landing</Text>
      </View>
    )
  }

  const Info = () => {
    return (
      <View>
        <Text>Info</Text>
      </View>
    )
  }

  const Next = () => {
    return (
      <View>
        <Text>Next</Text>
        <TouchableHighlight onPress={() => handleModalClose()}>
          <Text>Close modal</Text>
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Karuselli
        views={[<Landing key={0} />, <SignIn key={1} />, <Next key={2} />]}
        dotColor={"#c51c51"}
        colors={["red", "white", "gold"]}
        visible={visible}
        handleModalClose={handleModalClose}
      />
    </View>
  )
}
```

## Properties

| Prop     | Type    | Description                                                                                                                                                                                           |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| views    | array   | Add an array of views                                                                                                                                                                                 |
| colors   | array   | List of colors, that works as backgroundcolors. Each page has its own backgroundcolor, that will interpolate to the next pages backgroundcolor. **example: const colors = ['red', 'blue', 'yellow']** |
| visible  | boolean | You can use Karuselli as Modal, pass the state of the modals visibility as props                                                                                                                      |
| dotColor | string  | Dot color for the pagination, default is '#000000'                                                                                                                                                    |

## Contact

Email: joonas.aaltonen16@gmail.com
