import React, { useEffect, useState } from 'react';
import CreateProfileForm from './CreateProfileForm';
console.log('CreateProfileForm:', CreateProfileForm);

export default function ProfileListPage({ userId, onLogout }) {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);


  const fetchProfiles = async () => {
    try {
      const res = await fetch(`http://localhost:8088/profiles/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch profiles');
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchProfiles();
  }, [userId]);

  const filteredProfiles = profiles.filter(profile =>
    profile.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = async (profileId) => {
    try {
      const res = await fetch(`http://localhost:8088/profiles/${profileId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');

      // Remove profile from state
      setProfiles((prev) => prev.filter((p) => p.ProfileId !== profileId));
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  return (
    <>
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Welcome, User {userId}</h2>
              <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + New Profile
      </button>

        <button onClick={onLogout} className="text-sm bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search profiles by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-3 w-full border rounded-xl focus:outline-none focus:ring"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProfiles.map((profile) => (
          <div key={profile.ProfileId} className="relative p-4 border rounded-2xl shadow-md bg-white">
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(profile.ProfileId)}
            className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
            <h3 className="text-xl font-semibold">{profile.Name}</h3>
            <p>Gender: {profile.Gender}</p>
            <p>Occupation: {profile.Occupation}</p>

            <hr className="my-3" />

            <p className="font-medium">Health Info:</p>
            <p>BMI: {profile.BMI}</p>
            <p>Smoking: {profile.Smoking}</p>
            <p>Alcohol Drinking: {profile.AlcoholDrinking}</p>
            <p>Stroke: {profile.Stroke}</p>
            <p>Physical Health Days: {profile.PhysicalHealth}</p>
            <p>Mental Health Days: {profile.MentalHealth}</p>
            <p>Difficulty Walking: {profile.DiffWalking}</p>
            <p>Age Category: {profile.AgeCategory}</p>
            <p>Race: {profile.Race}</p>
            <p>Diabetic: {profile.Diabetic}</p>
            <p>Physical Activity : {profile.PhysicalActivity}</p>
            <p>General Health : {profile.GenHealth}</p>
            <p>Sleep Time: {profile.SleepTime}</p>
            <p>Asthma: {profile.Asthma}</p>
            <p>Kidney Disease: {profile.KidneyDisease}</p>
            <p>Skin Cancer: {profile.SkinCancer}</p>
          </div>
        ))}
      </div>
    </div>
     {showForm && (
      <CreateProfileForm
        onClose={() => setShowForm(false)}
        onProfileAdded={async () => {
          try {
            const res = await fetch(`http://localhost:8088/profiles/user/${userId}`);
            if (!res.ok) throw new Error('Failed to fetch profiles');
            const data = await res.json();
            setProfiles(data);
          } catch (err) {
            console.error('Error refreshing profiles:', err);
          }
        }}
      />
    )}
    </>
  );
}