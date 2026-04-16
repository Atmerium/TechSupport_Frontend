interface ProfileProps {
  userName: string;
  userEmail: string;
}


const Profile = ({ userName, userEmail }: ProfileProps) => {
  return (
    <div>
      <h1 className="display-5 fw-bold">Személyes adatok:</h1>
      <p className="col-md-8 fs-4"><strong>Felhasználónév:</strong> {userName}</p>
      <p className="col-md-8 fs-4"><strong>Email:</strong> {userEmail}</p>
    </div>
  );
}

export default Profile;