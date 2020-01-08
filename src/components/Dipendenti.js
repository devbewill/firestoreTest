import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

function Dipendenti({ studio, dip }) {
	const classes = useStyles();
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
		<div className="flexRow" className={classes.root}>
			<TextField
				id="standard-basic"
				label="Standard"
				type="text"
				value={dipNome}
				label="Dip nome"
				onChange={(e) => {
					setDipNome(e.target.value);
				}}
			/>

			<TextField
				id="standard-basic"
				label="Standard"
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
