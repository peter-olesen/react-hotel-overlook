import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import s from "../style/pages/Reservation.module.scss";
import { hotels } from "../data/hotels";

export const Reservation = () => {
  const [reservationMessage, setReservationMessage] = useState("");
  const [error, setError] = useState(null);

  const { userData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("user_id", userData?.user.id || "");
    urlencoded.append("hotel_id", data.destination_hotel);
    urlencoded.append("room_id", 1);
    urlencoded.append("num_persons", 5);
    urlencoded.append("is_flex", data.is_flex);
    urlencoded.append("checkin", data.checkin_date);
    urlencoded.append("checkout", data.checkout_date);
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("email", data.email);
    urlencoded.append("phone", data.phonenumber);
    urlencoded.append("comment", data.comment);

    console.log(data);
    console.log("Encoded Data:", urlencoded.toString());

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
          <select {...register("destination_hotel")}>
            <option value="Vælg destination & hotel">
              Vælg destination & hotel
            </option>

            {hotels?.map((country, countryIndex) => {
              return (
                <optgroup key={countryIndex} label={country.country}>
                  {country.cities.map((city, cityIndex) => {
                    return (
                      <>
                        <option key={`city-${cityIndex}`} disabled>
                          {city.name}
                        </option>
                        {city.hotels.map((hotel, hotelIndex) => (
                          <option key={hotelIndex} value={hotel.id}>
                            {hotel.name}
                          </option>
                        ))}
                      </>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>

          <div className={s.flexrow}>
            <select {...register("room_type")}>
              <option value="Vælg værelsestype">Vælg værelsestype</option>
            </select>
            <select {...register("amount_people")}>
              <option value="Vælg antal personer">Vælg antal personer</option>
            </select>
          </div>
          <p>Vælg prisklasse:</p>
          <div className={s.flexrow}>
            <input
              {...register("is_flex")}
              type="radio"
              value="0"
              id="price-normal"
            />{" "}
            <label htmlFor="price-normal">Normal</label>
          </div>
          <div className={s.flexrow}>
            <input
              {...register("is_flex")}
              type="radio"
              value="1"
              id="price-flex"
            />{" "}
            <label htmlFor="price-flex">Flex</label>
          </div>
          <div className={s.flexrow}>
            <input
              type="date"
              placeholder="checkin-date"
              {...register("checkin_date")}
            />
            <input
              type="date"
              placeholder="checkout-date"
              {...register("checkout_date")}
            />
          </div>
          <input type="text" placeholder="Fornavn" {...register("firstname")} />
          <input
            type="text"
            placeholder="Efternavn(e)"
            {...register("lastname")}
          />
          <div className={s.flexrow}>
            <input type="email" placeholder="Email" {...register("email")} />
            <input
              type="tel"
              placeholder="Telefon"
              {...register("phonenumber")}
            />
          </div>
          <textarea {...register("comment")} placeholder="Kommentarer" />
          <div className={s.flexrow}>
            <input
              type="checkbox"
              id="accept-terms"
              {...register("accept_terms", { required: true })}
            />
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
