import { Feature } from 'components/@index/feature';
import { Hero } from 'components/@index/hero';
import { Navbar } from 'components/@navbar/navbar';

import {
  experiments,
  fetchFeatures,
  fetchHeroData,
  heroInfo,
} from 'lib/experiments';

const HomePage = async () => {
  const features = await fetchFeatures(experiments);
  const hero = await fetchHeroData(heroInfo);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title={hero.title}
          description={hero.description}
          image={hero.image}
          cta={hero.cta}
        />

        <div className="flex flex-col gap-16 p-8">
          {features.map((feature, index) => (
            <Feature {...feature} key={index} reversed={index % 2 !== 0} />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
