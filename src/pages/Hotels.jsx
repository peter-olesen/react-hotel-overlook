import { useState } from "react";
import { CountrySwitcher } from "../components/CountrySwitcher/CountrySwitcher";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import { useBearerToken } from "../hooks/useBearerToken";

export const Hotels = () => {
  const [country, setCountry] = useState();

  const { data, isLoading, error } = useBearerToken(
    `http://localhost:4000/destinations/${country}`
  );

  return (
    <>
      <CountrySwitcher setCountry={setCountry} />
      <Main>
        <Section>
          <h2>{data?.name}</h2>
        </Section>
      </Main>
    </>
  );
};
