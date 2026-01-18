import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle actual authentication logic
        login();
        navigate('/profile');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4">{isLoginView ? 'Bejelentkezés' : 'Regisztráció'}</h2>
                            <form onSubmit={handleSubmit}>
                                {!isLoginView && (
                                    <div className="mb-3">
                                        <label className="form-label">Teljes név</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">Email cím</label>
                                    <input type="email" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Jelszó</label>
                                    <input type="password" className="form-control" required />
                                </div>
                                {!isLoginView && (
                                    <div className="mb-3">
                                        <label className="form-label">Jelszó megerősítése</label>
                                        <input type="password" className="form-control" required />
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        {isLoginView ? 'Belépés' : 'Regisztráció'}
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <button 
                                    className="btn btn-link text-decoration-none"
                                    onClick={() => setIsLoginView(!isLoginView)}
                                >
                                    {isLoginView 
                                        ? 'Nincs még fiókod? Regisztrálj!' 
                                        : 'Már van fiókod? Jelentkezz be!'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
