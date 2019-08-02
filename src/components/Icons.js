import React from 'react'

export const AngleDown = ({ width = 24, height = 24 }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
    <path fill='none' d='M0 0h24v24H0V0z' />
  </svg>
)

export const AngleUp = ({ width = 24, height = 24 }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <path d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' />
    <path d='M0 0h24v24H0z' fill='none' />
  </svg>
)

export const Close = ({ width = 24, height = 24 }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    <path d='M0 0h24v24H0z' fill='none' />
  </svg>
)
