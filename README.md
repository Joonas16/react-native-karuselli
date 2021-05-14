# **React native karuselli**

## Installation

> npm install rn-karuselli

---

> yarn add rn-karuselli

## Usage

Karuselli works as horizontal ScrollView. You can use it as it is or as modal

**All three sections must be added**

```js
<Karuselli
  section1={<Landing />}
  section2={<Info />}
  section3={<Next />}
  colors={colors}
  handleModalClose={handleModalClose}
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
        <Text>Landing</Text>
        <TouchableHighlight onPress={() => handleModalClose()}>
          <Text>Close modal</Text>
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Karuselli
        section1={<Landing />}
        section2={<Info />}
        section3={<Next />}
        colors={colors}
        visble={visible}
        handleModalClose={handleModalClose}
      />
    </View>
  )
}
```

## Properties

| Prop     | Type      | Description                                                                                                                                                                                           |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| section1 | component | Custom component                                                                                                                                                                                      |
| section2 | component | Custom component                                                                                                                                                                                      |
| section3 | component | Custom component                                                                                                                                                                                      |
| colors   | array     | List of colors, that works as backgroundcolors. Each page has its own backgroundcolor, that will interpolate to the next pages backgroundcolor. **example: const colors = ['red', 'blue', 'yellow']** |
| visible  | boolean   | You can use Karuselli as Modal, pass the state of the modals visibility as props                                                                                                                      |

## Contact

Email: joonas.aaltonen16@gmail.com
