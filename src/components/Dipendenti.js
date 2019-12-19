import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Button from '@material-ui/core/Button';

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

	const onUpdate = () => {
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.doc(dip.id).set({
			nome: dipNome,
			cognome: dipCognome
		});
	};

	const onDelete = () => {
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.doc(dip.id).delete();
	};

	return (
		<React.Fragment>
			<div className="dipendente">
				<input
					type="text"
					value={dipNome}
					label="Dip nome"
					onChange={(e) => {
						setDipNome(e.target.value);
					}}
				/>
				<input
					type="text"
					value={dipCognome}
					label="Dip cognome"
					onChange={(e) => {
						setDipCognome(e.target.value);
					}}
				/>
				<div className="action">
					<Button variant="contained" color="primary" onClick={onUpdate}>
						Update
					</Button>

					<Button variant="contained" color="secondary" onClick={onDelete}>
						Delete
					</Button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Dipendenti;
