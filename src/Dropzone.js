import React, { useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import './Dropzone.css'

export function Dropzone(props) {
  const {onFileUploaded} = props;
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
        'text/csv': ['.csv']
    },
    maxFiles:2
  });
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    onFileUploaded?.(acceptedFiles)
  }, [acceptedFiles, onFileUploaded])

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

