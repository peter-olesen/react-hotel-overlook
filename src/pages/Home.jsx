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
          {news?.map((item) => {
            let imgPath = `./assets/images`;
            let imgSrc = item?.image?.filename;
            return (
              <Card
                imgSrc={`${imgPath}/${imgSrc}`}
                title={item.title}
                path="/"
              />
            );
          })}
        </CardSection>
      </Main>
    </>
  );
};
