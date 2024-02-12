// Login.js
import React, { useState } from 'react';
import firebase from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Login bem-sucedido, redirecione ou faça outras ações necessárias
    } catch (error) {
      console.error(error.message);
      // Trate erros de login aqui
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        E-mail:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
