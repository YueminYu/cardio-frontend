import React, { useState, useEffect } from 'react';

export default function CreateProfileForm({ onClose, onProfileAdded, initialData = {}  }) {
  const [form, setForm] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Occupation: '',
    BMI: '',
    Smoking: '',
    AlcoholDrinking: '',
    Stroke: '',
    PhysicalHealth: '',
    MentalHealth: '',
    DiffWalking: '',
    Race: '',
    Diabetic: '',
    PhysicalActivity: '',
    GenHealth: '',
    SleepTime: '',
    Asthma: '',
    KidneyDisease: '',
    SkinCancer: ''
  });
 
  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8088/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Add failed');

      const newProfile = await res.json();
      onProfileAdded(); // refresh list
      onClose(); // close popup
    } catch (err) {
      console.error('Error adding profile:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(form).map(([key, val]) => (
            <div key={key}>
              <label className="block font-medium">{key}</label>
              <input
                name={key}
                value={val}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </div>
      </div>
    </div>
  );
}

