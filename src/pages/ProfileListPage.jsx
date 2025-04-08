import React, { useEffect, useState } from 'react';

export default function ProfileListPage({ userId, onLogout }) {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch profiles by userId from backend API (mocked here)
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
    

    if (userId) fetchProfiles();
  }, [userId]);

  const filteredProfiles = profiles.filter(profile =>
    profile.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Welcome, User {userId}</h2>
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
          <div key={profile.id} className="p-4 border rounded-2xl shadow-md bg-white">
            <h3 className="text-xl font-semibold">{profile.Name}</h3>
            <p>Age: {profile.Age}</p>
            <p>Gender: {profile.Gender}</p>
            <p>Occupation: {profile.Occupation}</p>

          </div>
        ))}
      </div>
    </div>
  );
}
