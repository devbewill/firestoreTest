import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import '../filepond.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import firebase from '../firebase';

const storage = firebase.storage();

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Filepond({ logo, setLogo }) {
	const [ files, setFiles ] = useState([]);

	return (
		<div>
			<FilePond
				files={files}
				server={{
					process: (_fieldName, file, _metadata, load, error, progress, _abort) => {
						const task = storage.ref('filepond').child(file.name).put(file);

						task.on(
							firebase.storage.TaskEvent.STATE_CHANGED,
							(snap) => {
								progress(true, snap.bytesTransferred, snap.totalBytes);
							},
							(err) => {
								error(err.message);
							},
							() => {
								storage.ref('logos').child(file.name).getDownloadURL().then((logo) => {
									setLogo(logo);
								});
							}
						);
					}
				}}
				labelIdle="Change logo"
				// onaddfile={(err, file) => console.log('on add', file.file)}
				// onupdatefiles={(fileItems) => {
				// 	//for multifile update
				// 	// console.log(fileItems[0].file);
				// 	// setFiles(fileItems.map((fileItem) => fileItem.file));

				// }}
			/>
		</div>
	);
}

export default Filepond;
