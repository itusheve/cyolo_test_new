import { useState } from "react";

export const FileUpload = ({ onChange }) => {
	const [dragActive, setDragActive] = useState(false);

	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			onChange?.(e.dataTransfer.files[0]);
		}
	};

	return (
		<div id="form-file-upload" onDragEnter={handleDrag}>
			<input
				onChange={(e) => onChange?.(e.target.files[0])}
				id="input-file-upload"
				type="file"
				name="image"
				accept="image/*"
			/>
			<label
				id="label-file-upload"
				htmlFor="input-file-upload"
				className={dragActive ? "drag-active" : ""}
			>
				<div>
					<p>Drag and drop your file here or</p>
					<span className="upload-button">Upload a file</span>
				</div>
			</label>
			{dragActive && (
				<div
					id="drag-file-element"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				></div>
			)}
		</div>
	);
};
