import { useParams } from "react-router-dom";
import { useBearerToken } from "../hooks/useBearerToken";
import { Main } from "../components/Main/Main";
import { Section } from "../components/Section/Section";
import { CountrySwitcher } from "../components/CountrySwitcher/CountrySwitcher";
import { useEffect } from "react";
import s from "../style/pages/Country.module.scss";
import { Card } from "../components/Card/Card";
import { Grid } from "../components/Grid/Grid";

export const Country = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useBearerToken(
    `http://localhost:4000/destinations/${slug}`
  );

  useEffect(() => {
    document.title = `${data?.name} - Hotel Overlook`;
  }, [data]);

  console.log(data);

  return (
    <>
      <CountrySwitcher />
      <Main sidebar={true}>
        <Section title={`Vores hoteller i ${data?.name}`} className={s.Country}>
          <p>{data?.description}</p>
          <Grid col="2" fr="1">
            {data?.cities.map((item) => {
              let imgPath = `../assets/images`;
              let imgSrc = item?.CityImage?.city_image_filename;
              return (
                <Card
                  key={item.id}
                  imgSrc={`${imgPath}/${imgSrc}`}
                  title={item.name}
                  path="/"
                />
              );
            })}
          </Grid>
        </Section>
      </Main>
    </>
  );
};
