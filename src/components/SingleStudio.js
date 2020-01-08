import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function SingleStudio({ studio }) {
	const [ dipendenti, setDipendenti ] = useState([]);

	useEffect(
		() => {
			const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);

			db.onSnapshot((snapshot) => {
				const data = [];

				snapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});

				setDipendenti(data);
			});
		},
		[ studio ]
	);

	return (
		<div className="singleStudio">
			<img className="logo" src={studio.logo} alt="" />
			<div className="studioName">
				<h1>{studio.nome}</h1>
				<h2>{studio.city}</h2>
			</div>
			<div className="studioDipendenti">
				<h3>Dipendenti</h3>
				<ul>
					{dipendenti.map((dip, i) => (
						<li key={i}>
							<span>{dip.nome}</span>
							<span>{dip.cognome}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SingleStudio;
