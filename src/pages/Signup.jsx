import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import s from "../style/pages/Signup.module.scss";

export const Signup = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("email", data.email);
    urlencoded.append("password", data.password);
    urlencoded.append("is_active", 1);
    urlencoded.append("org_id", 1);
    urlencoded.append("refresh_token", 1234);
    urlencoded.append("groups", 1);

    console.log(data);

    const options = {
      method: "POST",
      body: urlencoded,
    };

    fetch("http://localhost:4000/users", options)
      .then((res) => res.json())
      .then((data) => {
        setMessage("Du er nu oprettet på siden.");
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
              placeholder="E-mail"
              {...register("email", {
                required: "E-mailen er nødvendig.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ugyldigt e-mailformat",
                },
              })}
            />
            <input
              type="text"
              placeholder="First name"
              {...register("firstname", { required: true, maxLength: 80 })}
            />
            <input
              type="text"
              placeholder="Last name"
              {...register("lastname", { required: true, maxLength: 100 })}
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
              <input type="submit" className={s.Button} value="Opret bruger" />
            </div>
          </form>
        </div>

        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </Section>
    </Main>
  );
};
