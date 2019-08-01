# react-multiselect-dropdown

> 

[![NPM](https://img.shields.io/npm/v/react-multiselect-dropdown.svg)](https://www.npmjs.com/package/react-multiselect-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kvraamkey/react-multiselect-dropdown
```

## Usage

```jsx
import React, { Component } from 'react'

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

## License

MIT © [kvraamkey](https://github.com/kvraamkey)
