import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import s from "../style/pages/Signup.module.scss";

export const Signup = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", data.username);
    urlencoded.append("password", data.password);

    const options = {
      method: "POST",
      body: urlencoded,
    };

    fetch("http://localhost:4000/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setUserData(data);
          setLoginMessage("Du er nu logget ind");
        } else {
          setLoginMessage("Dit login er forkert");
        }
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setError("Der opstod en fejl. Prøv igen");
      });
  };

  return (
    <Main sidebar={true}>
      <Section title="Opret ny bruger" className={s.Signup}>
        <p>
          Indtast dine oplysninger for at oprette en ny bruger på Hotel Overlook
        </p>
        <div id="formDiv">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              autoComplete="email"
              placeholder="Brugernavn"
              {...register("username", {
                required: "E-mailen er nødvendig.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ugyldigt e-mailformat",
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <input
              type="password"
              autoComplete="current-password"
              placeholder="Adgangskode"
              {...register("password", {
                required: "Koden er nødvendig.",
                minLength: {
                  value: 5,
                  message: "Adgangskoden skal være mindst 5 tegn lang",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <div className={s.Buttons}>
              <input type="submit" className={s.Button} value="Login" />
              <button onClick={(e) => createUserForm()} className={s.Button}>
                Opret bruger
              </button>
            </div>
          </form>
        </div>

        {loginMessage && <p>{loginMessage}</p>}
        {error && <p className="error">{error}</p>}
      </Section>
    </Main>
  );
};
