import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import iconLocation from '../../assets/images/location_pin_map.png'
import iconTime from '../../assets/images/time_clock_watch.png'

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
  margin-bottom: 3px;
  text-transform: capitalize;
  color: ${props => props.theme.colours.primary};
`

const InfoWithIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
`

const Info = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colours.secondary};
`

const MinorInfo = styled.p`
  margin: 6px 0;
  font-size: 0.7rem;
  color: ${props => props.theme.colours.textSecondary};
`

const Summary = styled.p`
  margin: 3px 0 12px 0;
  color: ${props => props.theme.colours.textSecondary};
`

const Speakers = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colours.textSecondary};
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

const Icon = styled.img`
  height: 1rem;
  margin-right: 6px;
`

const SignageEvent = ({
  event: {
    title,
    dateStart,
    dateEnd,
    summary,
    location,
    ticketed,
    speakers,
  },
}) => (
  <StyledSignageEvent>
    <ImageHeader imageUrl="https://picsum.photos/480/270/?random">
      <DateTile date={dateStart} />
    </ImageHeader>
    <Details>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <InfoWithIcon>
        <Icon src={iconLocation} />
        <Info>
          {location}
        </Info>
      </InfoWithIcon>
      {
        // if single day, show times; if multiday, show date and time
        moment(dateStart).isSame(dateEnd, 'day')
          ? (
            <InfoWithIcon>
              <Icon src={iconTime} />
              <Info>
                {moment(dateStart).format('h:mm a')}
                &nbsp;—&nbsp;
                {moment(dateEnd).format('h:mm a')}
              </Info>
            </InfoWithIcon>
          )
          : (
            <InfoWithIcon>
              <Icon src={iconTime} />
              <Info>
                {moment(dateStart).format('D MMM YYYY, h:mm a')}
                &nbsp;—&nbsp;
                {moment(dateEnd).format('D MMM YYYY, h:mm a')}
              </Info>
            </InfoWithIcon>
          )
      }
      {
        speakers.length > 0
          ? (
            <Speakers>
              Speaker
              { speakers.length > 1 ? 's' : '' }
              :&nbsp;
              {
                speakers.join(', ')
              }
            </Speakers>
          )
          : null
      }
      {
        ticketed
          ? (
            <MinorInfo>A ticket is required for this event.</MinorInfo>
          )
          : null
      }
    </Details>
  </StyledSignageEvent>
)

export default SignageEvent
