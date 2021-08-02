import React, {useState, useRef} from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas';


export default function SigCanvas() {
    const [exportedSignatureURL,setExportedSignatureURL] = useState(null);
    const [signatureData, setSignatureData] = useState();
    let sigPad = useRef<ReactSignatureCanvas>();
    
    function clear () {
        clearSignatureData();
        sigPad.clear();
    };

    function clearSignatureData() {
        setSignatureData([]);
        console.log(`data cleared`)
    }

    function previous () {
        const currentRender = sigPad.toData()
        if (!signatureData.length) {
            setSignatureData(currentRender);
        };
        sigPad.fromData(currentRender.slice(0 , currentRender.length - 1))
    };

    function next () {
        const currentRenderPosition = sigPad.toData().length
        if (!signatureData.length) return;
        sigPad.fromData(signatureData.slice(0,currentRenderPosition + 1))
        
    };

    function exportSignature () {
        setSignatureData(sigPad.toData());
        setExportedSignatureURL ( sigPad.toDataURL('svg') );
        clear();
    };

    function showData () {
        console.clear()
        console.log(`current signature`)
        console.log(sigPad.toData())
        console.log({signatureData})
    }
    
    return (
        <div>
            <div>
                <SignatureCanvas ref={ (ref) => {sigPad = ref}}
                backgroundColor='rgba(153,204, 255,1)'
                penColor='rgba(0,0,153,1)'
                canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
                onEnd={clearSignatureData} />
            </div>
            
            <div>
                <button onClick={previous}>Previous</button>
                <button onClick={clear}>Clear</button>
                <button onClick={next}>Next</button>
                <button onClick={exportSignature}>Export</button>
                <button onClick={showData}>Console.log(data)</button>
            </div>
            {exportedSignatureURL
            ? <img src={exportedSignatureURL} alt="Your signature" />
            : null}
        </div>
    )
}
