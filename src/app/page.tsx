'use client'

import Carousel from "./components/Carousel";
import ImageTopCard from "./components/ImageTopCard";
import Image from 'next/image';


export default function Home() {
  const images = [
    '/images/banner-1.webp',
    '/images/banner-2.webp',
    '/images/banner-3.webp',
    '/images/banner-4.webp',
    '/images/banner-5.webp',
    '/images/banner-6.webp',
  ]

  return (
    <div className="md:mx-20 flex flex-col items-center justify-center">
      <Carousel images={images} intervalMs={5000} />
      <div className="my-10 text-center">
        <h1 className="md:text-4xl text-3xl font-bold mb-6">Conoce nuestros planes</h1>
        <p className="text-lg mb-8 mx-2">Elige el plan que mejor se adapte a tus necesidades de salud y paga menos por tus atenciones</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:mx-0 mx-4">
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-1.webp"
            title="Plan Básico"
            description="Ideal para quienes buscan atención médica general."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Básico seleccionado')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-2.webp"
            title="Plan Avanzado"
            description="Para quienes necesitan atención especializada."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Avanzado seleccionado')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-3.webp"
            title="Plan Premium"
            description="Atención integral con beneficios exclusivos."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Premium seleccionado')}
          />
        </div>

      </div>
      <div className="flex my-10 text-center justify-center">
        <div className="md:ml-20 ml-2 flex flex-col justify-center sm:pr-10 pr-2 items-center">
          <h1 className="md:text-4xl text-3xl font-bold mb-6">¿Eres médico y quieres trabajar con nosotros?</h1>
          <p className="text-lg mb-8">Nuestro propósito es ayudar a las personas a tener vidas más largas,
            sanas, felices y crear un mundo mejor. Además, queremos ser la compañía de
            salud más centrada en el cliente del mundo. ¡Acompañanos en este desafío!</p>
          <button className="bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-full w-fit cursor-pointer">
            Quiero trabajar con ustedes
          </button>
        </div>

        <div className="md:mr-20 mr-2 sm:flex hidden w-full relative h-[400px]">
          <Image
            src={"/images/patient-1.webp"}
            alt={"Imagen de médico"}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="my-10 text-center">
        <h1 className="md:text-4xl text-3xl font-bold mb-6">Cuida tu salud</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:mx-0 mx-4">
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-1.webp"
            title="Plan Básico"
            description="Ideal para quienes buscan atención médica general."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Básico seleccionado')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-2.webp"
            title="Plan Avanzado"
            description="Para quienes necesitan atención especializada."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Avanzado seleccionado')}
          />
          <ImageTopCard
            className="w-full"
            imageSrc="/images/patient-3.webp"
            title="Plan Premium"
            description="Atención integral con beneficios exclusivos."
            buttonText="Ver Plan"
            onButtonClick={() => alert('Plan Premium seleccionado')}
          />
        </div>

      </div>
    </div>
  );
}



