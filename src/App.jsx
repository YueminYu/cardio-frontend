import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ProfileListPage from './pages/ProfileListPage';

function App() {
  const [userId, setUserId] = useState(null);

  return userId ? (
    <ProfileListPage userId={userId} onLogout={() => setUserId(null)} />
  ) : (
    <LoginPage onLogin={setUserId} />
  );
}

export default App;