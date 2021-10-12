import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SigCanvas() {
	const [exportedSignatureURL, setExportedSignatureURL] = useState("");
	const [signatureData, setSignatureData] = useState([]);

	// *** sigPad needs to be properly typed ***
	let sigPad = useRef<any>();
	function handleClearCanvas() {
		clearSignatureData();
		sigPad.current?.clear();
	}
	function clearSignatureData() {
		setSignatureData([]);
	}
	function handlePrevious() {
		const currentRender = sigPad.current?.toData();
		if (signatureData && !signatureData.length) {
			setSignatureData(currentRender);
		}
		sigPad.current?.fromData(currentRender.slice(0, currentRender.length - 1));
	}
	function handleNext() {
		const currentRenderPosition = sigPad.current.toData().length;
		if (!signatureData.length) return;
		sigPad.current.fromData(signatureData.slice(0, currentRenderPosition + 1));
	}
	function handleExportSignature() {
		setSignatureData(sigPad.current?.toData());
		setExportedSignatureURL(sigPad.current?.toDataURL("svg"));
		handleClearCanvas();
	}
	function handleShowData() {
		console.clear();
		console.log(`current signature`);
		console.log(sigPad.current?.toData());

	}
	return (
		<div>
			<div>
				<SignatureCanvas
					ref={(ref) => {
						sigPad.current = ref;
					}}
					backgroundColor="rgba(153,204, 255,1)"
					penColor="rgba(0,0,153,1)"
					canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
					onEnd={clearSignatureData}
				/>
			</div>
			​
			<div>
				<button onClick={handlePrevious}>Previous</button>
				<button onClick={handleClearCanvas}>Clear</button>
				<button onClick={handleNext}>Next</button>
				<button onClick={handleExportSignature}>Export</button>
				<button onClick={handleShowData}>Show signature data (console)</button>
			</div>
			{exportedSignatureURL ? (
				<img src={exportedSignatureURL} alt="Your signature" />
			) : null}
		</div>
	);
}
