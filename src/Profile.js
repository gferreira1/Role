// Profile.js
import React, { useEffect, useState } from 'react';
import firebase from './firebase';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      {user ? (
        <div>
          <p>E-mail: {user.email}</p>
          <p>ID do Usuário: {user.uid}</p>
          {/* Adicione mais informações do perfil conforme necessário */}
        </div>
      ) : (
        <p>Usuário não autenticado</p>
      )}
    </div>
  );
}

export default Profile;
