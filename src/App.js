import './App.css';
import googleOneTap from 'google-one-tap';
import {userEffect, useState} from 'react';

const options = {
  client_id: process.env.DEV_JOKES_GOOGLE_CLIENT_ID,
  auto_select: false,
  cancel_on-tap_outside: false,
  context: "signin"

};

function App() {
  const [loginUser, setLoginUser] = useState(
    localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser'))
      : null
  );
  userEffect(() => {
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
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        HELLO CRYSTAL
      </header>
    </div>
  );
}

export default App;
