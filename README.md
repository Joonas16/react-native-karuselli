# **React native karuselli**

## Installation

> npm install rn-karuselli
---
> yarn add rn-karuselli

## Usage

### **Karuselli's width is 100% and 50% of you current screen size**

```
<Karuselli
  data={DATA}
  cardColor='white'
  fontColor='black'
  headerIcon={<AntDesign name="downcircle" size={27} color="black" />}
/>
```

## Properties

| Prop | Type | Description
| ----------- | ----------- | ----------- |
| data | array | Data needs to be in this format: *{ id: integer, header: 'string', subheader: 'string', content: 'string}*
| cardColor | string | Background color of the card
| fontColor | string | Sets the color for text
| headerIcon | component | Custom component, example: `<Ionicons name="md-checkmark-circle" size={26} color="green" />`

## Contact

Email: joonas.aaltonen16@gmail.com