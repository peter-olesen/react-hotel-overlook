import { useBearerToken } from "../hooks/useBearerToken";

import { Main } from "../components/Main/Main";
import { Slider } from "../components/Slider/Slider";
import { CardSection } from "../components/CardSection/CardSection";
import { Card } from "../components/Card/Card";

export const Home = () => {
  const {
    data: news,
    isLoading,
    error,
  } = useBearerToken("http://localhost:4000/news");

  return (
    <>
      <Slider />
      <Main>
        <CardSection title="Sidste nyt">
          {news?.slice(0, 3).map((item) => {
            let imgPath = `./assets/images`;
            let imgSrc = item?.image?.filename;
            return (
              <Card
                key={item.id}
                imgSrc={`${imgPath}/${imgSrc}`}
                title={item.title}
                path="/"
              />
            );
          })}
        </CardSection>
        <CardSection title="Se vores udvalg af værelser">
          <Card
            imgSrc="./assets/images/room-standard-single-bed.jpg"
            title="Standard Single"
            path="/"
          />
          <Card
            imgSrc="./assets/images/room-superior-plus-bedroom.jpg"
            title="Superior Plus"
            path="/"
          />
          <Card
            imgSrc="./assets/images/room-junior-suite-bedroom.jpg"
            title="Junior Plus"
            path="/"
          />
        </CardSection>
      </Main>
    </>
  );
};
