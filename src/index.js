import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxButtonLabel, Filter, AngleDown, AngleUp, Badge, Close } from './components'

import './select.css'

class MultiSelectDropDown extends React.PureComponent {
  container = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      showMenu: true,
      selectAllChecked: false,
      selectedItems: [],
      itemList: []
    }
  }

  componentDidMount() {
    var { selectedItem, primaryKey, itemList, showMenu } = this.props;

    if (selectedItem.length > 0) {
      selectedItem.forEach(selectedItem => {
        itemList.forEach(item => {
          if (item[primaryKey] && item[primaryKey] === selectedItem[primaryKey] && selectedItem[primaryKey]) {
            item.isChecked = true
          }
        })
      })
    }

    this.setState({
      showMenu,
      itemList,
      selectedItems: selectedItem,
      selectAllChecked: (selectedItem.length === itemList.length) ? true : false
    })

    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        showMenu: false
      })
    }
  };

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

  handleButtonClick = () => {
    this.setState(state => {
      return {
        showMenu: !state.showMenu
      }
    })
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
  }

  handleRemoveSelectedItem(e = undefined, item) {
    const { primaryKey } = this.props
    if (e) e.stopPropagation()

    let newSelectedItems = this.state.selectedItems.filter(selectedItem => selectedItem[primaryKey] !== item[primaryKey])

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

  handleFilter = (value) => {

    console.log(value)

    const { labelKey } = this.props;
    const { selectedItems } = this.state;

    let newSelectedItems = selectedItems.filter(selectedItem => {
      let v = selectedItem[labelKey].toString().toLowerCase();
      if (v && v.indexOf(value.toLowerCase()) !== -1) {
        return true;
      }
    })

    console.log(newSelectedItems)

  }

  render() {
    const { showMenu, itemList, selectedItems, selectAllChecked } = this.state
    const { badgeShowLimit, enableCheckAll, selectAllText, unSelectAllText, placeHolderText } = this.props
    return (
      <div className='container' ref={this.container}>
        <div className='selectedList' onClick={this.handleButtonClick}>
          {selectedItems.length === 0 && <div className='placeholder'>{placeHolderText}</div>}

          {selectedItems.length !== 0 && <div className='tags'>
            {selectedItems.map((menu, index) => {
              return (
                <React.Fragment key={index}>
                  {index < (badgeShowLimit ? badgeShowLimit : selectedItems.length) && <div className='tag' onClick={(e) => e.stopPropagation()}>
                    <span className='tag-label'>{menu.label}</span>
                    <span className='tag-close' onClick={(e) => this.handleRemoveSelectedItem(e, menu)}><Close width={16} height={16} /></span>
                  </div>}
                </React.Fragment>
              )
            })}
          </div>
          }

          {badgeShowLimit && (selectedItems.length - badgeShowLimit) > 0 && <div className='more'> +{selectedItems.length - badgeShowLimit} more</div>}

          <div className='selectIcon'>
            {showMenu && <AngleUp />}
            {!showMenu && <AngleDown />}
          </div>
        </div>

        {showMenu && (
          <div className='drop-down__menu-box'>

            <div className='list-filter'>
              <span className='c-search'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
              </span>
              <span className='c-clear'>
                <svg id='Capa_1' viewBox='0 0 51.976 51.976' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'><g><path d='M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0 C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778	c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828 c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828 l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z'></path></g></svg>
              </span>
              <input autoFocus onChange={(e) => this.handleFilter(e.target.value)} className='c-input' type='text' placeholder={placeHolderText} />
            </div>

            <div className='drop-down__menu'>
              {enableCheckAll && <div className='drop-down__item'>
                <input type='checkbox' checked={selectAllChecked || false} onChange={e => this.handleAllChecked(e)} className='hidden-box' id="selectAll" />
                <label htmlFor={"selectAll"} className='check--label'>
                  <span className='check--label-box' />
                  <span className='check--label-text'>{selectAllChecked ? unSelectAllText : selectAllText}</span>
                </label>
              </div>}
              {itemList.map((menu, index) => (
                <div className='drop-down__item' key={index}>
                  <input type='checkbox' className='hidden-box' onChange={(e) => this.handleItemSelect(e, menu)} checked={menu.isChecked || false} id={index} />
                  <label htmlFor={index} className='check--label'>
                    <span className='check--label-box' />
                    <span className='check--label-text'>{menu.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

MultiSelectDropDown.propTypes = {
  badgeShowLimit: PropTypes.number,
  primaryKey: PropTypes.string,
  enableCheckAll: PropTypes.bool,
  placeHolderText: PropTypes.string,
  selectAllText: PropTypes.string,
  unSelectAllText: PropTypes.string,
}

MultiSelectDropDown.defaultProps = {
  badgeShowLimit: undefined,
  primaryKey: 'value',
  enableCheckAll: true,
  placeHolderText: 'Select',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableSearchFilter: true,
}

export default MultiSelectDropDown
