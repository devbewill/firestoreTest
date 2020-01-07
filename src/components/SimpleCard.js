import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Dipendenti from './Dipendenti';
import AddDipendente from './AddDipendente';

function SimpleCard({ studio }) {
	const [ nome, setNome ] = useState(studio.nome);
	const [ city, setCity ] = useState(studio.city);

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
		db.collection('studi').doc(studio.id).set({ ...studio, nome, city });
	};

	const onDelete = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).delete();
	};

	return (
		<div className="flexRowParent">
			<img style={{ width: 100 }} src={studio.logo} alt="" />
			<h1>{studio.nome}</h1>

			<div className="card">
				<h3>Attributi Studio</h3>
				<div className="fields">
					<input
						placeholder={studio.nome}
						value={nome}
						label="Nome"
						onChange={(e) => {
							setNome(e.target.value);
						}}
					/>

					<input
						placeholder={studio.city}
						value={city}
						label="City"
						onChange={(e) => {
							setCity(e.target.value);
						}}
					/>

					<button variant="contained" color="primary" onClick={onUpdate}>
						Update
					</button>
					<button variant="contained" color="secondary" onClick={onDelete}>
						Delete
					</button>

					<div>
						<h3>Lista Dipendenti</h3>

						{dipendenti.map((dip, i) => <Dipendenti key={i} dip={dip} studio={studio} />)}
						<AddDipendente studio={studio} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SimpleCard;
