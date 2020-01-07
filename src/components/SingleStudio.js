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
		<div>
			<img style={{ width: 100 }} src={studio.logo} alt="" />
			<h1>{studio.nome}</h1>
			<h2>{studio.city}</h2>
			<h3>Lista Dipendenti</h3>
			<ul>
				{dipendenti.map((dip, i) => (
					<li key={i}>
						{dip.nome}
						{dip.cognome}
					</li>
				))}
			</ul>
		</div>
	);
}

export default SingleStudio;
