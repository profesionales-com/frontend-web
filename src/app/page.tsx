'use client'

import ImageTopCard from "./components/ImageTopCard";
import Image from 'next/image';
import Select from "./components/Select";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";


export default function Home() {

  const [selectedAttentionType, setSelectedAttentionType] = useState<'presencial' | 'remote' | 'onSite'>('presencial');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');

  // Estados de región/comuna
  const [regionOptions, setRegionOptions] = useState<{ label: string; value: string }[]>([]);
  const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setRegionOptions(data.map(r => ({ label: r.nombre, value: r.codigo })));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    fetch(`/api/regions/${selectedRegion}/communes`)
      .then(res => res.json())
      .then((data: { nombre: string; codigo: string }[]) => {
        setCommuneOptions(data.map(c => ({ label: c.nombre, value: c.codigo })));
      })
      .catch(console.error);
  }, [selectedRegion]);

  return (
    <div className="md:mx-20 flex flex-col items-center justify-center">
      <div className="my-10">
        <div className="text-start">
          <p className="text-4xl">
            Encuentra el profesional que necesitas y pide cita
          </p>
          <p>
            60 000 profesionales están aquí para ayudarte.
          </p>
        </div>
        <div className="flex flex-col gap-7 my-10">
          <div className='flex flex-col gap-6'>
            <div className="flex gap-4">
              {['presencial', 'remote', 'onSite'].map(type => (
                <button
                  key={type}
                  className={`border rounded-full px-4 py-2 text-md transition cursor-pointer ${selectedAttentionType === type
                    ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                    : 'bg-[var(--color-background)] text-[var(--color-foreground)]'}`}
                  onClick={() => setSelectedAttentionType(type as 'presencial' | 'remote' | 'onSite')}
                >
                  {type === 'presencial' ? 'Atención presencial' : type === 'remote' ? 'Atención remota' : 'Atención a domicilio'}
                </button>
              ))}
            </div>
            {/* <TextInput label={selectedIdType === 'rut' ? 'RUT' : 'Pasaporte'} value={idNumber} onChange={setIdNumber} name="id-number" /> */}
          </div>

          <div className="flex gap-5">
            <Select
              label="Profesional"
              value={selectedInsurance}
              onChange={setSelectedInsurance}
              options={[
                { label: 'Médico', value: 'doctor' },
                { label: 'Dentista', value: 'dentist' },
                { label: 'Psicólogo', value: 'psychologist' },
                { label: 'Abogado', value: 'lawyer' },
                { label: 'Arquitecto', value: 'architect' },
                { label: 'Ingeniero', value: 'engineer' },
                { label: 'Contador', value: 'accountant' },
              ]}
              filterable={true}
            />

            <DoubleSelect
              labelRegion="Región"
              labelCommune="Comuna"
              regions={regionOptions}
              communes={communeOptions}
              valueRegion={selectedRegion}
              valueCommune={selectedCommune}
              onRegionChange={val => { setSelectedRegion(val); setSelectedCommune(''); }}
              onCommuneChange={setSelectedCommune}
              className='hidden md:flex'
            />

            <Link href="/search">
              <button className="rounded-full cursor-pointer transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-base sm:text-base px-4 sm:px-7 h-full">
                <p>Buscar</p>
              </button>
            </Link>
          </div>


        </div>
      </div>
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

interface Option {
  label: string;
  value: string;
}

interface DoubleSelectProps {
  labelRegion: string;
  labelCommune: string;
  regions: Option[];
  communes: Option[];
  valueRegion: string;
  valueCommune: string;
  onRegionChange: (value: string) => void;
  onCommuneChange: (value: string) => void;
  className?: string;
}

function DoubleSelect({
  labelRegion,
  labelCommune,
  regions,
  communes,
  valueRegion,
  valueCommune,
  onRegionChange,
  onCommuneChange,
  className = "",
}: DoubleSelectProps) {
  const regionId = useId();
  const comunaId = useId();
  const [openMenu, setOpenMenu] = useState<'region' | 'comuna' | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selectedRegionLabel = regions.find(r => r.value === valueRegion)?.label || "";
  const selectedCommuneLabel = communes.find(c => c.value === valueCommune)?.label || "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const comunaDisabled = !valueRegion;

  return (
    <div className={`flex max-w-full items-center ${className}`} ref={ref}>
      {/* Región */}
      <div className="relative w-64">
        <div
          id={regionId}
          className={
            `peer border border-[var(--color-foreground)] border-r-0 rounded-l-full px-4 py-4 w-full cursor-pointer focus:outline-none bg-[var(--color-background)] ` +
            `${valueRegion ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => setOpenMenu(openMenu === 'region' ? null : 'region')}
        >
          {selectedRegionLabel || labelRegion}
        </div>
        <label
          htmlFor={regionId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!valueRegion && openMenu !== 'region' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `bg-[var(--color-background)] px-1 pointer-events-none`
          }
        >
          {labelRegion}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'region' && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {regions.map((r) => (
              <li
                key={r.value}
                className={`px-4 py-2 cursor-pointer ${valueRegion === r.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onRegionChange(r.value);
                  onCommuneChange("");
                  setOpenMenu(null);
                }}
              >
                {r.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Comuna */}
      <div className="relative w-64">
        <div
          id={comunaId}
          className={
            `peer border border-[var(--color-foreground)]  rounded-r-full px-4 py-4 w-full cursor-pointer focus:outline-none ` +
            `${comunaDisabled ? 'bg-[var(--color-foreground)]/20 cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `${valueCommune ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => {
            if (!comunaDisabled) {
              setOpenMenu(openMenu === 'comuna' ? null : 'comuna');
            }
          }}
        >
          {selectedCommuneLabel || labelCommune}
        </div>
        <label
          htmlFor={comunaId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!valueCommune && openMenu !== 'comuna' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `${comunaDisabled ? 'bg-transparent cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `px-1 pointer-events-none`
          }
        >
          {labelCommune}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'comuna' && !comunaDisabled && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {communes.map((c) => (
              <li
                key={c.value}
                className={`px-4 py-2 cursor-pointer ${valueCommune === c.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onCommuneChange(c.value);
                  setOpenMenu(null);
                }}
              >
                {c.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}



