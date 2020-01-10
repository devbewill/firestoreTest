import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Dipendenti from './Dipendenti';
import AddDipendente from './AddDipendente';
// import ImageUpload from './ImageUpload';
import Filepond from './Filepond';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

function SimpleCard({ studio }) {
	const classes = useStyles();
	const [ nome, setNome ] = useState(studio.nome);
	const [ city, setCity ] = useState(studio.city);
	const [ logo, setLogo ] = useState(studio.logo);
	const [ tid, setTid ] = useState(studio.tid);

	const [ dipendenti, setDipendenti ] = useState([]);

	useEffect(
		() => {
			setNome(studio.nome);
			setCity(studio.city);

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

	const onUpdate = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).set({ ...studio, nome, city, logo, tid });
	};

	const onDelete = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).delete();
	};

	return (
		<div className="card">
			<div className="nameImage">
				<img src={studio.logo} alt="" />
				<h1>{studio.nome}</h1>
				<Filepond logo={logo} setLogo={setLogo} />
			</div>
			{/* <Filepond logo={logo} setLogo={setLogo} /> */}

			<div className={classes.root}>
				<h3>Denominazione</h3>
				<TextField
					color="primary"
					placeholder={studio.nome}
					value={nome}
					label="Nome"
					onChange={(e) => {
						setNome(e.target.value);
					}}
				/>

				<TextField
					color="primary"
					placeholder={studio.city}
					value={city}
					label="City"
					onChange={(e) => {
						setCity(e.target.value);
					}}
				/>

				<TextField
					color="primary"
					placeholder={studio.tid}
					value={tid}
					label="TID"
					onChange={(e) => {
						setTid(e.target.value);
					}}
				/>

				<button variant="contained" color="primary" onClick={onUpdate}>
					Update
				</button>
				<button className="delete" variant="contained" color="secondary" onClick={onDelete}>
					Delete
				</button>

				<div>
					<h3>Lista Dipendenti</h3>

					{dipendenti.map((dip, i) => <Dipendenti key={i} dip={dip} studio={studio} />)}

					<h3>Aggiungi Dipendenti</h3>
					<AddDipendente studio={studio} />
				</div>
			</div>
		</div>
	);
}

export default SimpleCard;
