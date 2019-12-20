import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const storage = firebase.storage();

function ImageUpload() {
	const [ image, setImage ] = useState(null);
	const [ url, setUrl ] = useState('');
	const [ progress, setProgress ] = useState(0);

	const handleUpload = () => {
		const uploadTask = storage.ref(`avatar/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// progrss function ....
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				setProgress(progress);
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref('avatar').child(image.name).getDownloadURL().then((url) => {
					console.log('url ' + url);
					setUrl({ url });
				});
			}
		);
	};

	return (
		<div>
			<progress value={progress} max="100" />
			<input
				type="file"
				onChange={(e) => {
					setImage(e.target.files[0]);
				}}
			/>
			<button onClick={handleUpload}> Upload </button>
		</div>
	);
}

export default ImageUpload;
