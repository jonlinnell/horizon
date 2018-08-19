import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Tile = styled.div`
  background-color: ${props => props.theme.colours.primary};
  font-family: ${props => props.theme.fonts.infoTile};
  padding: 10px 0;
  height: 64px;
  width: 64px;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 1;
`

const Day = styled.span`
  color: ${props => props.theme.colours.contrast};
  font-size: 1.5rem;
  padding: 0;
  display: block;
`

const Month = styled.span`
  color: ${props => props.theme.colours.contrast};
  font-size: 1rem;
  display: block;
  padding: 0;
  text-transform: uppercase;
`

const DateTile = ({ date }) => (
  <Tile>
    <Day>{ moment(date).format('DD') }</Day>
    <Month>{ moment(date).format('MMM') }</Month>
  </Tile>
)

export default DateTile
