import "./App.css";

import { useState } from "react";
import { Modal } from "./components/Modal/Modal";
import { FileUpload } from "./components/FileUpload/FileUpload";

function App() {
	const [url, setUrl] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [file, setFile] = useState(null);

	async function onSubmit(event) {
		try {
			event.preventDefault();
			const ttl = event.target.ttl.valueAsNumber;
			const form = new FormData();
			form.append("image", file); //file
			const headers = {};
			if (ttl) {
				headers["image-ttl"] = ttl;
			}
			const res = await fetch("/v1/file", {
				method: "PUT",
				body: form,
				headers: headers,
			});
			const body = await res.json();
			if (res.ok) {
				setUrl(body);
				setShowModal(true);
			}
		} catch (error) {
			console.log("error", error);
		}
	}
	return (
		<div className="App">
			<form className="card" onSubmit={onSubmit} action="">
				<FileUpload onChange={setFile} />
				<input type="number" name="ttl" placeholder="ttl in mins default 60" />
				<button>upload</button>
			</form>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<span>{url?.src}</span>
					<button
						onClick={() => {
							navigator.clipboard.writeText(url.src);
						}}
					>
						copy
					</button>
				</Modal>
			)}
		</div>
	);
}

export default App;
