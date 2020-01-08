import React, { useState } from 'react';
import firebase from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		},

		background: '#efefef',
		padding: '2em',
		borderRadius: '0 0 1em 1em'
	}
}));

function AddStudio() {
	const classes = useStyles();
	const [ newStudioNome, setNewStudioNome ] = useState('');
	const [ newStudioCity, setNewStudioCity ] = useState('');

	const onCreate = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity });
		setNewStudioNome('');
		setNewStudioCity('');
	};

	return (
		<div className="container">
			<div className="addBar" className={classes.root}>
				<h2>Add new studio</h2>
				<TextField
					id="standard-basic"
					placeholder="nome"
					value={newStudioNome}
					label="Nome nuovo Studio"
					onChange={(e) => setNewStudioNome(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					placeholder="city"
					value={newStudioCity}
					label="City nuovo Studio"
					onChange={(e) => setNewStudioCity(e.target.value)}
				/>

				<button variant="contained" color="primary" onClick={onCreate}>
					Add New
				</button>
			</div>
		</div>
	);
}

export default AddStudio;
