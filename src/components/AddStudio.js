import React, { useState } from 'react';
import firebase from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		},

		padding: '2em'
	}
}));

function AddStudio() {
	const classes = useStyles();
	const [ newStudioNome, setNewStudioNome ] = useState('');
	const [ newStudioCity, setNewStudioCity ] = useState('');
	const [ newStudioTID, setNewStudioTID ] = useState('');

	const onCreate = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity, tid: newStudioTID });
		setNewStudioNome('');
		setNewStudioCity('');
		setNewStudioTID('');
	};

	return (
		<div className="container">
			<div className={classes.root}>
				<h1>Aggiungi nuovo studio</h1>
				<TextField
					placeholder="nome"
					value={newStudioNome}
					label="Nome nuovo Studio"
					onChange={(e) => setNewStudioNome(e.target.value)}
				/>
				<TextField
					placeholder="city"
					value={newStudioCity}
					label="City nuovo Studio"
					onChange={(e) => setNewStudioCity(e.target.value)}
				/>

				<TextField
					placeholder="city"
					value={newStudioTID}
					label="TID nuovo Studio"
					onChange={(e) => setNewStudioTID(e.target.value)}
				/>

				<button variant="contained" color="primary" onClick={onCreate}>
					Add New
				</button>
			</div>
		</div>
	);
}

export default AddStudio;
