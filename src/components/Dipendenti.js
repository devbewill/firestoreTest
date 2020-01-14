import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';

function Dipendenti({ studio, dip }) {
	const [ dipNome, setDipNome ] = useState(dip.nome);
	const [ dipCognome, setDipCognome ] = useState(dip.cognome);

	useEffect(
		() => {
			setDipNome(dip.nome);
			setDipCognome(dip.cognome);
		},
		[ dip ]
	);

	const onUpdate = (e) => {
		e.preventDefault();
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.doc(dip.id).set({
			nome: dipNome,
			cognome: dipCognome
		});
	};

	const onDelete = (e) => {
		e.preventDefault();
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.doc(dip.id).delete();
	};

	return (
		<div>
			<TextField
				type="text"
				value={dipNome}
				label="Dip nome"
				onChange={(e) => {
					setDipNome(e.target.value);
				}}
			/>

			<TextField
				value={dipCognome}
				label="Dip cognome"
				onChange={(e) => {
					setDipCognome(e.target.value);
				}}
			/>

			<button variant="contained" color="primary" onClick={onUpdate}>
				Update
			</button>

			<button className="delete" variant="contained" color="secondary" onClick={onDelete}>
				Delete
			</button>
		</div>
	);
}

export default Dipendenti;
