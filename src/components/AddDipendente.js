import React, { useState } from 'react';
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

function AddDipendente({ studio }) {
	const classes = useStyles();
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
		<div className="flexrow separator" className={classes.root}>
			<TextField
				id="standard-basic"
				placeholder="nome"
				value={newDipNome}
				label="nome"
				onChange={(e) => setNewDipNome(e.target.value)}
			/>
			<TextField
				id="standard-basic"
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
