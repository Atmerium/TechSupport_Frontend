interface ProfileProps {
  userName: string;
  userId: number;
  userEmail: string;
}


const Profile = ({ userName, userId, userEmail }: ProfileProps) => {
  return (
    <div>
      <h1 className="display-5 fw-bold">Személyes adatok:</h1>
      <p className="col-md-8 fs-4"><strong>Felhasználónév:</strong> {userName}</p>
      <p className="col-md-8 fs-4"><strong>Email:</strong> {userEmail}</p>
    </div>
  );
}

export default Profile;