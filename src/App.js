import './App.css';
import ImportokWizard from '@importok/react';

function App() {
  const fields = {
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

  const saveRecord = async function (record, meta) {
    // Fake a network request and throw an error randomly
    const random = Math.floor(Math.random() * 10);
    const status = random === 5 ? 500 : 200;
    const response = await fetch('https://httpstat.us/' + status);
    if (!response?.ok) {
      throw new Error(`Response status ${response.status}`);
    }
  };

  return (
    <div className="App">
      <ImportokWizard
        title="ImportOK Example for React"
        fields={fields}
        onRecordReady={saveRecord}
      />
    </div>
  );
}

export default App;
