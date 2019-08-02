import React from 'react'

export const CheckboxButtonLabel = ({ checked, keyId, onChange, textComponent }) => {
  return (
    <React.Fragment>
      <input type='checkbox'
        id={keyId}
        checked={checked}
        onChange={onChange} />
      <label htmlFor={keyId}><span>{textComponent}</span></label>
    </React.Fragment>
  )
}
