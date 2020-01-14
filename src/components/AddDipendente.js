import React, { useState } from 'react';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';

function AddDipendente({ studio }) {
	const [ newDipNome, setNewDipNome ] = useState('');
	const [ newDipCognome, setNewDipCognome ] = useState('');

	const onCreate = (e) => {
		e.preventDefault();
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.add({ nome: newDipNome, cognome: newDipCognome });
		setNewDipNome('');
		setNewDipCognome('');
	};

	return (
		<div>
			<TextField
				placeholder="nome"
				value={newDipNome}
				label="nome"
				onChange={(e) => setNewDipNome(e.target.value)}
			/>
			<TextField
				placeholder="cognome"
				value={newDipCognome}
				label="cognome"
				onChange={(e) => setNewDipCognome(e.target.value)}
			/>
			<button onClick={onCreate}>Add new</button>
		</div>
	);
}

export default AddDipendente;
