import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FeatureProps {
  title: string;
  description: string;
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
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500 text-gray-50">
            {icon}
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
        </div>
        <p className="text-lg">{description}</p>
        <div>{cta}</div>
      </div>
      <div className="flex-1">
        <Image src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};
