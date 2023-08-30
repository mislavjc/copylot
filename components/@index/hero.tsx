import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

interface HeroProps {
  title: string;
  description: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  cta?: ReactNode;
}

export const Hero = ({ title, description, image, cta }: HeroProps) => {
  return (
    <section className="border-b border-gray-200 bg-blue-100 px-8 pt-16">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-16 text-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-bold text-blue-950">{title}</h1>
          <p className="text-xl text-gray-700">{description}</p>
          <div>{cta}</div>
        </div>
        <Image src={image.src} alt={image.alt} />
      </div>
    </section>
  );
};
