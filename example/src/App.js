import React, { Component } from 'react'

import MultiSelectDropDown from '@kvraamkey/react-multiselect-dropdown'

export default class App extends Component {
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
  render() {
    return (
      <div style={{ width: 500, margin: "0 auto", marginTop: 40 }}>
        <MultiSelectDropDown
          itemList={this.state.itemList}
          selectedItems={selectedItems => console.log(selectedItems)}
        />
      </div>
    )
  }
}
