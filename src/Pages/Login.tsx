import { useState } from "react";
import { useNavigate } from "react-router";
import type { User } from "../Interfaces/UserInterface";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const [, setCookie] = useCookies(["user"]);
  const [loginRegForm, setLoginRegForm] = useState<User>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLoginView) {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmailName: loginRegForm.userEmail,
            userPassword: loginRegForm.userPassword,
          }),
        });
        if (res.ok) {
          const data = await res.json().catch(() => null);
          setCookie("user", { userName: data.userName, userEmail: data.userEmail, userId: data.id, token: data.token }, { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
          login();
          navigate("/profile");
        } else {
          const errorData = await res.json().catch(() => ({ message: "Bejelentkezés sikertelen" }));
          if (errorData.message === "Invalid email/username") {
            setError("Helytelen email vagy felhasználónév");
          } else if (errorData.message === "Invalid password") {
            setError("Helytelen jelszó");
          } else {
            setError(errorData.message || "Bejelentkezés sikertelen");
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ismeretlen hiba történt a bejelentkezéskor.");
      }
    } else if (!isLoginView) {
      try {
        if (loginRegForm.userPassword === loginRegForm.userConfirmPassword) {
          const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userEmail: loginRegForm.userEmail,
              userName: loginRegForm.userName,
              userPassword: loginRegForm.userPassword,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            setCookie("user", { userName: data.userName, userId: data.userId }, { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
            login();
            navigate("/profile");
          } else {
            const errorData = await res.json().catch(() => ({ message: "Regisztráció sikertelen" }));
            
            if (Array.isArray(errorData.message)) {
              setError(errorData.message.join(", "));
            } else if (errorData.statusCode === 500 || errorData.message === "Internal server error") {
              setError("A felhasználónév vagy email már foglalt lehet.");
            } else {
              setError(errorData.message || "Regisztráció sikertelen");
            }
          }
        }
        else {
          setError("A megadott jelszavak nem egyeznek.");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ismeretlen hiba történt a regisztrációkor.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">
                {isLoginView ? "Bejelentkezés" : "Regisztráció"}
              </h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {!isLoginView && (
                  <div className="mb-3">
                    <label className="form-label">Felhasználó név</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={loginRegForm.userName}
                      onChange={(e) =>
                        setLoginRegForm({
                          ...loginRegForm,
                          userName: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {!isLoginView && (
                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={loginRegForm.userEmail}
                      onChange={(e) =>
                        setLoginRegForm({
                          ...loginRegForm,
                          userEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                {isLoginView && (
                  <div className="mb-3">
                    <label className="form-label">
                      Email vagy felhasználónév
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={loginRegForm.userEmail}
                      onChange={(e) =>
                        setLoginRegForm({
                          ...loginRegForm,
                          userEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Jelszó</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={loginRegForm.userPassword}
                    onChange={(e) =>
                      setLoginRegForm({
                        ...loginRegForm,
                        userPassword: e.target.value,
                      })
                    }
                  />
                </div>
                {!isLoginView && (
                  <div className="mb-3">
                    <label className="form-label">Jelszó megerősítése</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={loginRegForm.userConfirmPassword}
                      onChange={(e) =>
                        setLoginRegForm({
                          ...loginRegForm,
                          userConfirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isLoginView ? "Belépés" : "Regisztráció"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError(null);
                  }}
                >
                  {isLoginView
                    ? "Nincs még fiókod? Regisztrálj!"
                    : "Már van fiókod? Jelentkezz be!"}
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
