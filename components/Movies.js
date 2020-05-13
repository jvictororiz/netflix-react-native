import React, { useState } from 'react'
import { Dimensions, TouchableWithoutFeedback } from 'react-native'

import styled from 'styled-components/native'

import { useSpring, useSprings, animated, config } from 'react-spring'

const Container = styled.View`
	padding: 20px 0;
`

const Label = styled.Text`
	color: #fff;
	font-size: 16px;
	margin: 0 0 5px 10px;
`
const MovieScroll = styled.ScrollView`
	padding-left: 10px;
`

const MoviePoster = styled.Image`
	width: ${Math.round((Dimensions.get('window').width * 28) / 100)}px;
	height: 150px;
`

const MovieCard = styled.View`
	padding-right: 9px;
`

const AnimatedMoviePoster = animated(MoviePoster);

const Movies = ({ label, item, onSelect }) => {

	const [pressing, setPressed] = useState({ item: null });

	const getProps = item => useSpring({
		duration: 1000,
		to: {
			width: pressing.item == item ? 115 : 100,
		}
	});
	return (
		<Container>
			<Label>{label}</Label>
			<MovieScroll horizontal >
				{item.map((movie, item) => {
					return (
						<MovieCard key={String(item)}>
							<TouchableWithoutFeedback
								onPressIn={() => {
									setPressed({ item })
									onSelect && onSelect(movie)
								}}
								onPressOut={() => {
									setPressed({ item: null })
								}}>	
								<AnimatedMoviePoster style={getProps(item)} resizeMode='cover' source={movie} />
							</TouchableWithoutFeedback>
						</MovieCard>
					)
				})}
			</MovieScroll>
		</Container>
	)
}

export default Movies