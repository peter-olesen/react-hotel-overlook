import { useState } from "react";
import { CountrySwitcher } from "../components/CountrySwitcher/CountrySwitcher";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import { useBearerToken } from "../hooks/useBearerToken";
import { Card } from "../components/Card/Card";
import { Grid } from "../components/Grid/Grid";

export const Hotels = () => {
  const [country, setCountry] = useState();

  const { data, isLoading, error } = useBearerToken(
    `http://localhost:4000/destinations/`
  );

  console.log(data);

  return (
    <>
      <CountrySwitcher setCountry={setCountry} />
      <Main>
        <Section title="Alle vores destinationer">
          <Grid col={3} fr={1}>
            {data?.map((item) => {
              let imgPath = `../assets/images`;
              let imgSrc = item?.CountryImage?.country_image_filename;
              return (
                <Card
                  key={item.id}
                  title={item.name}
                  imgSrc={`${imgPath}/${imgSrc}`}
                  path={`/country/${item.slug}`}
                />
              );
            })}
          </Grid>
        </Section>
      </Main>
    </>
  );
};
