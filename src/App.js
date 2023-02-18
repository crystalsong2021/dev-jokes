import './App.css';
import googleOneTap from 'google-one-tap';
import React, { useEffect, useState} from 'react';

const options = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "signin"
};

function App() {
  const [loginUser, setLoginUser] = useState(
    localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser'))
      : null
  );
  useEffect(() => {
    googleOneTap(options, async (response) => {
      console.log(response);
      const res = await fetch("/api/google-login", {
        method: "POST",
        body: JSON.stringify({
          token: response.credential,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setLoginUser(data);
      localStorage.setItem("loginUser", JSON.stringify(data));
    });
  }, [loginUser])

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Implement "Google One-Tap Login" In React and Node.js</h1>
        {console.log('User: ', loginUser)}
        <div>
          {loginUser ? (
            <div>
              <h3>
                You "{loginUser.name}" logged in as {loginUser.email}
              </h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>Not logged in</div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
