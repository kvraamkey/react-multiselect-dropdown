import React, { Component } from 'react'

import MultiSelectDropDown from '@kvraamkey/react-multiselect-dropdown'

export default class App extends Component {
  state = {
    itemList: [
      { label: "Connected Car", value: "Connected Car" },
      { label: "Connected Services", value: "Connected Services" },
      { label: "Corporate", value: "Corporate" },
      { label: "Lifestyle Audio", value: "Lifestyle Audio" },
      { label: "Professional Solutions", value: "Professional Solutions" }
    ]
  }
  render() {
    return (
      <div style={{ width: 900, margin: "0 auto", marginTop: 40 }}>
        <MultiSelectDropDown
          itemList={this.state.itemList}
          enableSearchFilter={false}
          enableCheckAll
          // badgeShowLimit={3}
          labelKey="label"
          primaryKey="value"
          selectedItem={[
            { label: "Connected Car", value: "Connected Car" },
            { label: "Connected Services", value: "Connected Services" },
            { label: "Corporate", value: "Corporate" },
            { label: "Lifestyle Audio", value: "Lifestyle Audio" },
          ]}
          selectedItems={selectedItems => console.log(selectedItems)}
        />
      </div>
    )
  }
}
