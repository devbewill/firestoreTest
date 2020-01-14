import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Dipendenti from './Dipendenti';
import AddDipendente from './AddDipendente';
// import ImageUpload from './ImageUpload';
import Filepond from './Filepond';

import TextField from '@material-ui/core/TextField';

function SimpleCard({ studio }) {
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

	const exportToJsonFile = (e) => {
		e.preventDefault();
		let dataStr = JSON.stringify(studio);
		let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

		let exportFileDefaultName = 'data.json';

		let linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	};

	return (
		<div className="card">
			<div className="nameImage">
				<img src={studio.logo} alt="" />

				<h1>{studio.nome}</h1>

				<h3>Attributi Studio</h3>
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

				<Filepond logo={logo} setLogo={setLogo} />

				<button variant="contained" color="primary" onClick={onUpdate}>
					Update
				</button>
				<button className="delete" variant="contained" color="secondary" onClick={onDelete}>
					Delete
				</button>

				<button className="exportParam" variant="contained" onClick={exportToJsonFile}>
					export parameter
				</button>
			</div>

			<div className="listaDip">
				<h3>Lista Dipendenti</h3>
				<p>
					In questa sezione è possibile visualizzare e allo stesso modificare gli attributi dei singoli
					dipendenti
				</p>

				{dipendenti.map((dip, i) => <Dipendenti key={i} dip={dip} studio={studio} />)}
				<div className="spacer" />
				<h3>Aggiungi Dipendenti</h3>
				<p>In questa sezione è possibile aggiungere nuovi dipendenti dello studio ed i relativi attributi</p>
				<AddDipendente studio={studio} />
			</div>
		</div>
	);
}

export default SimpleCard;
