import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxButtonLabel, Filter, AngleDown, AngleUp, Badge } from './components'

import './styles.css'

class MultiSelectDropDown extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      selectAllChecked: false,
      selectedItems: [],
      itemList: []
    }

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  componentDidMount() {
    this.setState({
      showMenu: this.props.showMenu,
      itemList: this.props.itemList
    })
  }

  toggleMenu() {
    if (!this.state.showMenu) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }))
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return
    }
    this.toggleMenu()
  }

  handleAllChecked(event) {
    let itemList = this.state.itemList
    itemList.forEach(item => (item.isChecked = event.target.checked))

    this.setState({
      itemList,
      selectAllChecked: event.target.checked,
      selectedItems: event.target.checked ? itemList : []
    })

    this.props.selectedItems(event.target.checked ? itemList : [])
  }

  handleRemoveSelectedItem(e = undefined, item) {
    const { primaryKey } = this.props
    if (e) e.stopPropagation()

    let newSelectedItems = this.state.selectedItems.filter(selectedItem => selectedItem !== item)

    let newItemList = this.state.itemList.filter(itemList => {
      if (itemList[primaryKey] === item[primaryKey]) {
        itemList.isChecked = false
      }
      return itemList
    })

    this.setState({
      selectedItems: [...newSelectedItems],
      itemList: [...newItemList],
      selectAllChecked: newSelectedItems.length === newItemList.length
    })

    this.props.selectedItems([...newSelectedItems])
  }

  handleItemSelect(event, item) {
    let itemList = this.state.itemList
    item.isChecked = event.target.checked
    if (event.target.checked) {
      const selectedItems = [...this.state.selectedItems, item]
      this.setState({
        selectedItems,
        selectAllChecked: itemList.length === selectedItems.length
      })
      this.props.selectedItems(selectedItems)
    } else {
      this.handleRemoveSelectedItem(event, item)
    }

    this.setState({ itemList })
  }

  render() {
    const { showMenu, itemList, selectedItems, selectAllChecked } = this.state
    const {
      placeHolderText,
      selectAllText,
      unSelectAllText,
      enableSearchFilter,
      enableCheckAll,
      badgeShowLimit,
      classes,
      labelKey
    } = this.props

    return (
      <div className={`cuppa-dropdown ${classes}`} ref={node => { this.node = node }}>
        <div className='selected-list'>
          <div className='c-btn' onClick={() => this.toggleMenu()}>

            {selectedItems.length === 0 && <span>{placeHolderText}</span>}

            {selectedItems.length !== 0 && <div className='c-list'>
              {selectedItems.map((item, index) => {
                if (badgeShowLimit) {
                  if (index < badgeShowLimit) {
                    return <Badge key={index} label={item[labelKey]} handleClick={(e) => this.handleRemoveSelectedItem(e, item)} />
                  } else {
                    return (
                      <span className='countplaceholder c-list' key={index}>
                        <div className='c-token'>
                          <span className='c-label'>+{selectedItems.length - badgeShowLimit} more</span>
                        </div>
                      </span>
                    )
                  }
                } else {
                  return <Badge key={index} label={item[labelKey]} handleClick={(e) => this.handleRemoveSelectedItem(e, item)} />
                }
              }
              )}
            </div>}

            {showMenu && <span className='c-angle-up'><AngleUp /></span>}

            {!showMenu && <span className='c-angle-down'> <AngleDown /></span>}

          </div>
        </div>

        {showMenu && <div className='dropdown-list'>
          <div className='arrow-2 arrow-up' />
          <div className='arrow-up' />

          <div className='list-area'>
            {enableCheckAll && <div className='pure-checkbox select-all'>
              <CheckboxButtonLabel keyId={'selectBox'} checked={selectAllChecked} onChange={e => this.handleAllChecked(e)} textComponent={selectAllChecked ? unSelectAllText : selectAllText} />
            </div>}

            {enableSearchFilter && <Filter {...this.props} />}

            <div style={{ overflow: 'auto', maxHeight: 300 }}>
              {itemList.length !== 0 && <ul className='lazyContainer'>
                {itemList.map((item, index) =>
                  <li className='pure-checkbox' key={index}>
                    <CheckboxButtonLabel keyId={index} checked={item.isChecked} onChange={e => this.handleItemSelect(e, item)} textComponent={item[labelKey]} />
                  </li>
                )}
              </ul>}

              {itemList.length === 0 && <p align='center'>empty items</p>}
            </div>

          </div>
        </div>}

      </div>
    )
  }
}

MultiSelectDropDown.propTypes = {
  showMenu: PropTypes.bool,
  singleSelection: PropTypes.bool,
  placeHolderText: PropTypes.string,
  selectAllText: PropTypes.string,
  unSelectAllText: PropTypes.string,
  enableSearchFilter: PropTypes.bool,
  classes: PropTypes.string,
  searchPlaceholderText: PropTypes.string,
  badgeShowLimit: PropTypes.number,
  labelKey: PropTypes.string,
  primaryKey: PropTypes.string,
  itemList: PropTypes.array.isRequired,
  addNewItemOnFilter: PropTypes.bool,
  enableCheckAll: PropTypes.bool,

  selectedItems: PropTypes.func.isRequired

}

MultiSelectDropDown.defaultProps = {
  singleSelection: false,
  placeHolderText: 'Select',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
  classes: '',
  searchPlaceholderText: 'Search',
  labelKey: 'itemName',
  primaryKey: 'id',
  badgeShowLimit: undefined,
  enableCheckAll: true,
  itemList: [],
  addNewItemOnFilter: false
}

export default MultiSelectDropDown
