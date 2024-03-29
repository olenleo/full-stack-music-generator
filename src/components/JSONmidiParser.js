/* eslint-disable react/prop-types */
import React from 'react';

const JSONmidiParser = ({midiData, title, track}) => {
	if (midiData.length === 0) {
		return (
			<div>
				<h3>Loading midi data</h3>
			</div>
		);
	}
	
	const tracks = midiData.track.length;
	if (track === null || track === undefined) {
		return(
			<div>
				<p>Waiting on track selection</p>
			</div>
		);
	}
	return (
		<div>
			<h3>Midi data:</h3>
			<p>Track title: {title}</p>
			<p>Number of tracks: {tracks}</p>
			<p>Render track:</p>
		</div>
	);
};
export default JSONmidiParser;