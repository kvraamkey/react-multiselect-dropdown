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
    ],
    isClear: false
  }
  reset = () => {
    console.log('reset', this.state.isClear);
    this.setState({ isClear: true });
  }
  render() {
    return (
      <div style={{ width: 900, margin: "0 auto", marginTop: 40 }}>

        <button onClick={() => this.reset()}>reset</button>

        <MultiSelectDropDown
          itemList={this.state.itemList}
          enableSearchFilter={true}
          enableCheckAll
          // badgeShowLimit={3}
          reset={this.state.isClear}
          labelKey="label"
          primaryKey="value"
          selectedItem={[]}
          selectedItems={selectedItems => {
            console.log(selectedItems)
            if (selectedItems.length === 0) {
              this.setState({ isClear: false })
            }
          }}
        />
      </div>
    )
  }
}
