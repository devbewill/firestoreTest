import React from 'react';

function SimpleCard(props) {
	return (
		<div className="card">
			<h1>{props.nome}</h1>
			<p>{props.city}</p>
		</div>
	);
}

export default SimpleCard;
