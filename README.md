

# React Multiselect Dropdown with Limit

## Installing / Getting started

This package is available in npm repository as @kvraamkey/react-multiselect-dropdown. It will work correctly with all popular bundlers.

```
npm install @kvraamkey/react-multiselect-dropdown --save

[using Yarn]

yarn add @kvraamkey/react-multiselect-dropdown -s
```

## Include the Component

To start using MultiSelectDropDown you just need to import the component from the @kvraamkey/react-multiselect-dropdown package.

## Usage

```jsx
import React, { Component } from 'react';
import MultiSelectDropDown from '@kvraamkey/react-multiselect-dropdown'

class Example extends Component {
    state = {
    itemList: [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Brazil" }
    ]
  }
  render () {
    return (
      <MultiSelectDropDown
        itemList={this.state.itemList}
        selectedItems={selectedItems => console.log(selectedItems)}
      />
    )
  }
}
```

## PropTypes

| Prop | Type | Default |
| ---- | ---- | ------- |
| badgeShowLimit | Integer | undefined |
| primaryKey | String | value |
| labelKey | String | label |
| enableCheckAll | Boolean | true |
| enableSearchFilter | Boolean | true |
| placeHolderText | String | Select |
| selectAllText | String | Select All |
| unSelectAllText | String | UnSelect All |
| enableCheckAll | Boolean | true |


## Licensing

The code in this project is licensed under MIT license.

MIT © [kvraamkey](https://github.com/kvraamkey)
