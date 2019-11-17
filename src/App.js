import React from "react";
import { useDropzone } from "react-dropzone";

import { resizeImage } from "./image-utils";

function App() {
  const imageRef = document.getElementById("bullshitconversion");

  const onDrop = acceptedFiles => {
    acceptedFiles.forEach(async asyncfile => {
      const b64 = await resizeImage(asyncfile, 1200);
      if (imageRef) {
        imageRef["src"] = b64;
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="app">
      <h1>
      <img alt="party" src="party.gif" height="30px" /> Party Parrot Main Thread Usage Check
      </h1>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <img alt="output" id="bullshitconversion" />
    </div>
  );
}

export default App;
