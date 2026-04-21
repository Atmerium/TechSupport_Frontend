interface ProfileProps {
  userName: string;
  userEmail: string;
}

const Profile = ({ userName, userEmail }: ProfileProps) => {
  return (
    <div className="p-3 p-md-5 mb-4 bg-body-tertiary rounded-3">
      <h1 className="display-5 fw-bold">Személyes adatok:</h1>
      <h2 className="col-md-8 fs-4">Itt tudod a személyes adataidat megnézni vagy változtatni</h2>
      <div className="col-md-8 fs-4 mt-4">
        <label htmlFor="userName" className="form-label">Felhasználónév:</label>
        <input type="text" className="form-control" id="userName" defaultValue={userName} />
        <label htmlFor="userEmail" className="form-label">Email:</label>
        <input type="text" className="form-control" id="userEmail" defaultValue={userEmail} />
      </div>
    </div>
  );
}

export default Profile;