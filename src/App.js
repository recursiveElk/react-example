import './App.css';
import ImportokWizard from '@importok/react';
import React, {useState, useMemo} from 'react';
import {Dropzone} from './Dropzone'
import {read, utils} from 'xlsx';

// const demoUploadedFile = new File(
//   [
//     'id,first_name,last_name,email,phone,address,country' + "\n",
//     '1,Jarred,Barton,Ricky.Stroman@gmail.com,605-747-6709,46709 Travon Gateway,EG' + "\n",
//     '2,Ivory,Yundt,Desiree2@gmail.com,459-727-9328 x788,1032 Haley Point,TF' + "\n",
//     '3,Randy,Bruen,Isobel.Wisoky@hotmail.com,364-899-5352,972 Fadel Shores,AI' + "\n",
//   ],
//   'contacts.csv',
//   { type: 'text/csv' }
// );

const demoFields = {
  first_name: {
    label: 'First Name',
    transformers: 'capitalize|trim'
  },
  last_name: {
    label: 'Last Name',
    validators: 'required|length:5',
    transformers: 'capitalize|trim'
  },
  company_name: {
    label: 'Company Name',
    transformers: 'trim'
  },
  email: {
    label: 'Email',
    validators: 'email|required',
    transformers: 'lowercase|trim'
  },
  phone: {
    label: 'Phone',
    validators: 'phone',
    transformers: 'replace:-|trim'
  },
  country: {
    label: 'Country',
    validators: 'in:CY,GR,UK',
    transformers: 'uppercase|trim',
  },
};


function App() {

  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [stream, setStream] = useState(undefined);

  const saveRecord = async function (record, meta) {
    // Fake a network request and throw an error randomly
    const random = Math.floor(Math.random() * 10);
    const status = random === 5 ? 500 : 200;
    const response = await fetch('https://httpstat.us/' + status);
    if (!response?.ok) {
      throw new Error(`Response status ${response.status}`);
    }
  };
  console.log('uploadedFile', uploadedFile)

  const outputStream = useMemo(() => {
    if (stream) {
      var wb2 = read(stream, {type:"binary"});
      console.log('wb2',wb2)
      var js = utils.sheet_to_json(wb2.Sheets.Sheet1, {header:1, raw:true});
      return js
    }
    return undefined
  }, [stream])
  const cols = outputStream?.[0];
  console.log('outputStream', outputStream)
  const fields = cols?.reduce((acc, col) => {
    if (acc[col] === undefined) {
      acc[col.replaceAll(" ", "_").toLowerCase()] = col
    }
    return acc
  }, {})
  console.log('fields', fields)

  return (
    <div className="App">
      <Dropzone onFileUploaded={(file, stream) => {
        console.log('acceptedFiles', file, stream)
        setUploadedFile(file)
        setStream(stream)
      }}/>
      <div><strong>cols</strong>: {cols?.toString()}</div>
      <br/><br/>
      <div><strong>fields</strong>: {JSON.stringify(fields)}</div>
      <br/><br/>
      <ImportokWizard
        key={uploadedFile}
        title="ImportOK Example for React"
        fields={demoFields}
        sampleFile="/sample.csv"
        onRecordReady={saveRecord}
        uploadedFile={uploadedFile}
      />
    </div>
  );
}

export default App;
