import React, { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  dob: string;
  notes: string;
  medications: string[];
  allergies: string[];
};

const PatientLookup = () => {
  const [inputId, setInputId] = useState('');
  const [patient, setPatient] = useState<Patient | null>(null);

  const handleSearch = async () => {
    const res = await fetch('/mock-patients.json');
    const data: Patient[] = await res.json();
    const found = data.find((p) => p.id === inputId.trim());
    setPatient(found || null);
  };

  return (
    <div className="p-4 rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">🔍 Patient Lookup</h2>
      <input
        type="text"
        placeholder="Enter Patient ID (e.g., P123)"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {patient && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-bold text-lg">{patient.name}</h3>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Medications:</strong> {patient.medications.join(', ')}</p>
          <p><strong>Allergies:</strong> {patient.allergies.join(', ') || 'None'}</p>
          <p className="mt-2 italic text-gray-700">📝 Notes: {patient.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PatientLookup;
