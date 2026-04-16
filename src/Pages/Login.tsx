import { useState } from "react";
import { useNavigate } from "react-router";
import type { User } from "../Interfaces/UserInterface";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
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
          setCookie("user", { userName: data.userName, userEmail: data.userEmail, userId: data.userId }, { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
          login();
          navigate("/profile");
        }
      } catch (error) {
        alert(error);
      }
    } else if (!isLoginView) {
      try {
        if (loginRegForm.userPassword == loginRegForm.userConfirmPassword) {
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
          }
        }
        else {
          alert("Hibásan megadott jelszó")
        }
      } catch (error) {
        alert(error);
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
                  className="btn btn-link text-decoration-none"
                  onClick={() => setIsLoginView(!isLoginView)}
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
