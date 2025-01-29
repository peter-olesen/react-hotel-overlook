import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import s from "../style/pages/Reservation.module.scss";

export const Reservation = () => {
  const [reservationMessage, setReservationMessage] = useState("");
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("user_id", UserData?.user_id);
    urlencoded.append("hotel_id", data.hotel - id);
    urlencoded.append("room_id", data.room - id);
    urlencoded.append("is_flex", data.isFlex);
    urlencoded.append("num_persons", data.amount - people);
    urlencoded.append(
      "checkin",
      "Sun Jan 26 2025 23:39:21 GMT+0000 (Coordinated Universal Time)"
    );
    urlencoded.append(
      "checkout",
      "Tue Apr 22 2025 15:58:37 GMT+0000 (Coordinated Universal Time)"
    );
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("email", data.email);
    urlencoded.append("phone", data.phonenumber);
    urlencoded.append("comment", data.comment);

    const options = {
      method: "POST",
      body: urlencoded,
    };

    fetch("http://localhost:4000/reservations", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setUserData(data);
          setReservationMessage("Vi har modtaget din reservation");
        } else {
          setReservationMessage("Der er sket en fejl med din reservation");
        }
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setError("Der opstod en fejl. Prøv igen");
      });
  };
  return (
    <Main sidebar={true}>
      <Section title="Reservation" className={s.Reservation}>
        <p>
          Udfyld nedenstående formular for at reservere et af vores værelser.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("destination-hotel")}>
            <option value="Vælg destination & hotel">
              Vælg destination & hotel
            </option>
          </select>
          <div className={s.flexrow}>
            <select {...register("room-type")}>
              <option value="Vælg værelsestype">Vælg værelsestype</option>
            </select>
            <select {...register("amount-people")}>
              <option value="Vælg antal personer">Vælg antal personer</option>
            </select>
          </div>
          <p>Vælg prisklasse:</p>
          <div className={s.flexrow}>
            <input
              {...register("price")}
              type="radio"
              value="Normal"
              id="price-normal"
            />{" "}
            <label htmlFor="price-normal">Normal</label>
          </div>
          <div className={s.flexrow}>
            <input
              {...register("price")}
              type="radio"
              value="Flex"
              id="price-flex"
            />{" "}
            <label htmlFor="price-flex">Flex</label>
          </div>
          <div className={s.flexrow}>
            <input type="date" placeholder="checkin-date" {...register} />
            <input type="date" placeholder="checkout-date" {...register} />
          </div>
          <input type="text" placeholder="Fornavn" {...register} />
          <input type="text" placeholder="Efternavn(e)" {...register} />
          <div className={s.flexrow}>
            <input type="email" placeholder="Email" {...register} />
            <input type="tel" placeholder="Telefon" {...register} />
          </div>
          <textarea {...register} placeholder="Kommentarer" />
          <div className={s.flexrow}>
            <input type="checkbox" id="accept-terms" {...register} />{" "}
            <label htmlFor="accept-terms">
              Jeg accepterer hermed Overlooks betingelser (sæt kryds)
            </label>
          </div>
          <input type="submit" value="Send reservation" />
        </form>
      </Section>
    </Main>
  );
};
