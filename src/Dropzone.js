import React, { useEffect , useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import './Dropzone.css'

export function Dropzone(props) {
  const {onFileUploaded} = props;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        onFileUploaded?.(acceptedFiles[0], binaryStr)
        console.log('string', binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, []);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
        'text/csv': ['.csv']
    },
    maxFiles:1,
    onDrop,
  });

  
 
  // useEffect(() => {
  //   onFileUploaded?.(acceptedFiles)
  // }, [acceptedFiles, onFileUploaded])

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

