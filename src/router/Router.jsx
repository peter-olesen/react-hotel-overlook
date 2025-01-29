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
    setMessage("");
    setError(null);

    let urlencoded = new URLSearchParams();
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("email", data.email);
    urlencoded.append("password", data.password);
    urlencoded.append("is_active", 1);
    urlencoded.append("org_id", 1);
    urlencoded.append("refresh_token", 1234);
    urlencoded.append("groups", 1);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    };

    fetch("http://localhost:4000/users", options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fejl: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMessage("Du er nu oprettet på siden.");
        setUserData(data);
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setError("Der opstod en fejl. Prøv igen.");
      });
  };

  return (
    <Main sidebar={true}>
      <Section title="Opret ny bruger" className={s.Signup}>
        <p>
          Indtast dine oplysninger for at oprette en ny bruger på Hotel Overlook
        </p>
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
          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="text"
            placeholder="Fornavn"
            {...register("firstname", { required: "Fornavn er påkrævet." })}
          />
          {errors.firstname && <p>{errors.firstname.message}</p>}

          <input
            type="text"
            placeholder="Efternavn"
            {...register("lastname", { required: "Efternavn er påkrævet." })}
          />
          {errors.lastname && <p>{errors.lastname.message}</p>}

          <input
            type="password"
            autoComplete="current-password"
            placeholder="Adgangskode"
            {...register("password", {
              required: "Koden er nødvendig.",
              minLength: {
                value: 8,
                message: "Adgangskoden skal være mindst 8 tegn lang",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Koden skal indeholde mindst ét tal og ét specialtegn",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <div className={s.Buttons}>
            <input type="submit" className={s.Button} value="Opret bruger" />
          </div>
        </form>

        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </Section>
    </Main>
  );
};
