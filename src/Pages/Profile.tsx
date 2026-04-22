import type {ListedUser} from "../Interfaces/UserInterface";
import { useState, useEffect } from 'react';

interface ProfileProps {
  id: string | number;
  token: string;
  userName: string;
  userEmail: string;
  role: string;
  onUpdateSuccess?: (newName: string, newEmail: string) => void;
}

const Profile = ({ id, token, userName, userEmail, role, onUpdateSuccess }: ProfileProps) => {
  const [currentName, setCurrentName] = useState(userName);
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usersList, setUsersList] = useState<ListedUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    setCurrentName(userName);
    setCurrentEmail(userEmail);
  }, [userName, userEmail]);

  useEffect(() => {
    if (role === 'admin') {
      fetchUsers();
    }
  }, [role, token]);

  const isChanged = currentName !== userName || currentEmail !== userEmail;

  const handleDiscard = () => {
    setCurrentName(userName);
    setCurrentEmail(userEmail);
    setError(null);
  };


  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userName: currentName,
          userEmail: currentEmail
        })
      });

      if (!response.ok) {
        throw new Error('Hiba történt az adatok mentése során!');
      }

      const fetchResponse = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!fetchResponse.ok) {
         throw new Error('Sikeres mentés, de nem sikerült letölteni a friss adatokat!');
      }

      const updatedUser = await fetchResponse.json();
      
      const fetchedName = updatedUser.userName;
      const fetchedEmail = updatedUser.userEmail;

      setCurrentName(fetchedName);
      setCurrentEmail(fetchedEmail);

      if (onUpdateSuccess) {
        onUpdateSuccess(fetchedName, fetchedEmail);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      } else {
        console.error("Nem sikerült betölteni a profilokat.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const isConfirmed = window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setUsersList(prev => prev.filter(user => user.id !== id));
      } else {
        alert('Hiba történt a felhasználó törlésekor.');
      }
    } catch (err) {
      console.error(err);
      alert('Hálózati hiba a törlésnél.');
    }
  };

  const handleGrantAdmin = async (id: number) => {
    const isConfirmed = window.confirm("Biztosan adminisztrátori jogot adsz ennek a felhasználónak?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userRole: 'admin' }) 
      });

      if (res.ok) {
        setUsersList(prev => prev.map(user => 
            user.id === id ? { ...user, userRole: 'admin' } : user
        ));
      } else {
        alert('Hiba történt a jogosultság módosításakor.');
      }
    } catch (err) {
      console.error(err);
      alert('Hálózati hiba a jogosultság megadásakor.');
    }
  };


  return (
    <div className="container mt-5">
      <div className="p-3 p-md-5 mb-4 bg-body-tertiary rounded-3">
        <h1 className="display-5 fw-bold">Személyes adatok:</h1>
        <h2 className="col-md-8 fs-4">Itt tudod a személyes adataidat megnézni vagy változtatni</h2>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="col-md-8 fs-4 mt-4">
          <label htmlFor="userName" className="form-label">Felhasználónév:</label>
          <input 
            type="text" 
            className="form-control" 
            id="userName" 
            value={currentName} 
            onChange={(e) => setCurrentName(e.target.value)}
            disabled={isLoading}
          />

          <label htmlFor="userEmail" className="form-label">Email:</label>
          <input 
            type="text" 
            className="form-control" 
            id="userEmail" 
            value={currentEmail} 
            onChange={(e) => setCurrentEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {isChanged && (
          <div className="mt-4 d-flex gap-3 col-md-8">
            <button 
              className="btn btn-success px-4" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Mentés...' : 'Mentés'}
            </button>
            <button 
              className="btn btn-secondary px-4" 
              onClick={handleDiscard}
              disabled={isLoading}
            >
              Elvetés
            </button>
          </div>
        )}
      </div>
      {role === 'admin' && (
        <div className="p-3 p-md-5 mb-4 bg-body-tertiary rounded-3 shadow-sm mt-5">
          <h2 className="display-6 fw-bold mb-4">Adminisztrátori Panel</h2>
          <h3 className="fs-5 mb-4">Regisztrált felhasználók kezelése</h3>
          
          {isLoadingUsers ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Töltés...</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle bg-white">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Név</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Szerepkör</th>
                    <th scope="col" className="text-center">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.length > 0 ? (
                    usersList.map((user) => {
                      const currentUserId = user.id;
                      if (currentUserId === Number(id)) {
                        return (
                          <tr key={currentUserId}>
                          <td className="fw-medium">{user.userName}</td>
                          <td>{user.userEmail}</td>
                          <td>
                            <span className={`badge ${user.userRole === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                              {user.userRole === 'admin' ? 'Adminisztrátor' : 'Felhasználó'}
                            </span>
                          </td>
                          <td/>
                        </tr>
                        );
                      }
                      return (
                        <tr key={currentUserId}>
                        <td className="fw-medium">{user.userName}</td>
                        <td>{user.userEmail}</td>
                        <td>
                          <span className={`badge ${user.userRole === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                            {user.userRole === 'admin' ? 'Adminisztrátor' : 'Felhasználó'}
                          </span>
                        </td>
                        <td className="text-center">
                          {currentUserId !== Number(id) && (
                            <div className="d-flex justify-content-center gap-2">
                              {user.userRole !== 'admin' && (
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleGrantAdmin(currentUserId)}
                                >
                                  Admin jog
                                </button>
                              )}
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteUser(currentUserId)}
                              >
                                Törlés
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-3 text-muted">Nincsenek megjeleníthető felhasználók.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
    
    
  );
}

export default Profile;