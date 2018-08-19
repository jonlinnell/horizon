import React from 'react'
import styled from 'styled-components'

import DateTile from '../DateTile'

const StyledSignageEvent = styled.div`

  @media only screen and (min-width: 492px) {
    width: 480px;
    margin: 6px;
  }

  margin-bottom: 12px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: capitalize;
  color: ${props => props.theme.colours.primary};
`

const Summary = styled.p`
  color: ${props => props.theme.colours.textSecondary};
`

const Speakers = styled.p`
  color: rgb(200, 70, 170);
`

const ImageHeader = styled.div`
  @media only screen and (min-width: 492px) {
    width: 480px;
    height: 270px;
  }

  @media only screen and (max-width: 492px) {
    max-width: 100%;
    height: 54.879vw;
    background-size: cover;
    overflow: hidden;
  }

  position: relative;
  background-image: url(${props => props.imageUrl});
`

const Details = styled.div`
  padding: 12px;
  background-color: ${props => props.theme.colours.bgLight};
`

const SignageEvent = ({
  event: {
    title,
    summary,
    speakers,
    dateStart,
  },
}) => (
  <StyledSignageEvent>
    <ImageHeader imageUrl="https://via.placeholder.com/480x270">
      <DateTile date={dateStart} />
    </ImageHeader>
    <Details>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <Speakers>
        Speaker
        { speakers.length > 1 ? 's' : '' }
        :&nbsp;
        {
          speakers.join(', ')
        }
      </Speakers>
    </Details>
  </StyledSignageEvent>
)

export default SignageEvent
