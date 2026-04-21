
import { useState, useEffect } from 'react';

interface ProfileProps {
  userId: string | number;
  token: string;
  userName: string;
  userEmail: string;
  onUpdateSuccess?: (newName: string, newEmail: string) => void;
}

const Profile = ({ userId, token, userName, userEmail, onUpdateSuccess }: ProfileProps) => {
  const [currentName, setCurrentName] = useState(userName);
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentName(userName);
    setCurrentEmail(userEmail);
  }, [userName, userEmail]);

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
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
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

      const fetchResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!fetchResponse.ok) {
         throw new Error('Sikeres mentés, de nem sikerült letölteni a friss adatokat!');
      }

      const updatedUser = await fetchResponse.json();
      
      const fetchedName = updatedUser.userName || updatedUser.name || currentName;
      const fetchedEmail = updatedUser.userEmail || updatedUser.email || currentEmail;

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

  return (
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
  );
}

export default Profile;