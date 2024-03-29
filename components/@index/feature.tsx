import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FeatureProps {
  title: {
    value: string;
    variationId: string;
    experimentId: string;
  };
  description: {
    value: string;
    variationId: string;
    experimentId: string;
  };
  icon?: ReactNode;
  image: {
    src: StaticImageData;
    alt: string;
  };
  cta?: ReactNode;
  reversed?: boolean;
}

export const Feature = ({
  title,
  description,
  icon,
  image,
  cta,
  reversed = false,
}: FeatureProps) => {
  return (
    <section
      className={`mx-auto flex max-w-screen-lg flex-col gap-8 md:gap-16 ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex size-8 items-center justify-center rounded bg-blue-500 text-gray-50">
            {icon}
          </div>
          <h2
            className="text-xl font-bold md:text-3xl"
            data-variation={title.variationId}
            data-experiment={title.experimentId}
          >
            {title.value}
          </h2>
        </div>
        <p
          className="text-lg"
          data-variation={description.variationId}
          data-experiment={description.experimentId}
        >
          {description.value}
        </p>
        <div>{cta}</div>
      </div>
      <div className="flex-1">
        <Image src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};
