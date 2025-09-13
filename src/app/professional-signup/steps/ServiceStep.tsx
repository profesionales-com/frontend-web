import Select from '@/app/components/Select';
import { services } from '@/app/data';
import { on } from 'events';
import React, { useState, useMemo, useEffect, useRef, useId } from 'react';

interface ServiceStepProps {
  regionOptions: { label: string; value: string }[];
  communeOptions: { label: string; value: string }[];
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCommune: string;
  setSelectedCommune: (commune: string) => void;
  selectedServiceArea: string;
  setSelectedServiceArea: (area: string) => void;
  selectedServiceSpecialty: string;
  setSelectedServiceSpecialty: (specialty: string) => void;
}

export default function ServiceStep({
  regionOptions, communeOptions,
  selectedRegion, setSelectedRegion,
  selectedCommune, setSelectedCommune,
  selectedServiceArea, setSelectedServiceArea,
  selectedServiceSpecialty, setSelectedServiceSpecialty }: ServiceStepProps) {

  return (
    <div className="flex md:flex-row flex-col justify-center w-fit gap-10 mb-6">
      {/* Bloque Personal */}
      <div className="flex flex-col gap-10 ">
        <DoubleSelect
          firstLabel='Área'
          secondLabel='Servicio/Especialidad'
          firstOptions={
            Array.from(
              new Set(services.map(service => service.category_label))
            ).map(category => ({
              label: category,
              value: category
            }))
          }
          secondOptions={
            services
              .filter(service => service.category_label === selectedServiceArea)
              .map(service => ({
                label: service.label,
                value: service.label
              }))
          }
          firstValue={selectedServiceArea}
          secondValue={selectedServiceSpecialty}
          onFirstChange={setSelectedServiceArea}
          onSecondChange={setSelectedServiceSpecialty}
        />
      </div>
      {/* Bloque Servicio/Ubicación */}
      <div className="flex flex-col gap-10">
        <div className='flex flex-col gap-10'>

          <DoubleSelect
            firstLabel="Región"
            secondLabel="Comuna"
            firstOptions={regionOptions}
            secondOptions={communeOptions}
            firstValue={selectedRegion}
            secondValue={selectedCommune}
            onFirstChange={setSelectedRegion}
            onSecondChange={setSelectedCommune}
            className='hidden md:flex'
          />

          {/* // Mobile view
                                // Convert double select to a single select for region and other for commune */}
          <Select
            label="Región"
            value={selectedRegion}
            onChange={setSelectedRegion}
            options={regionOptions}
            className='md:hidden'
          />
          <Select
            label="Comuna"
            value={selectedCommune}
            onChange={setSelectedCommune}
            options={communeOptions}
            className='md:hidden'
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
  firstLabel: string;
  secondLabel: string;
  firstOptions: Option[];
  secondOptions: Option[];
  firstValue: string;
  secondValue: string;
  onFirstChange: (val: string) => void;
  onSecondChange: (val: string) => void;
  className?: string;
}

function DoubleSelect({
  firstLabel,
  secondLabel,
  firstOptions,
  secondOptions,
  firstValue,
  secondValue,
  onFirstChange,
  onSecondChange,
  className = "",
}: DoubleSelectProps) {
  const regionId = useId();
  const comunaId = useId();
  const [openMenu, setOpenMenu] = useState<'region' | 'comuna' | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selectedFirstLabel = firstOptions.find(r => r.value === firstValue)?.label || "";
  const selectedSecondLabel = secondOptions.find(c => c.value === secondValue)?.label || "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const secondDisabled = !firstValue;

  return (
    <div className={`flex max-w-full items-center ${className}`} ref={ref}>
      {/* Región */}
      <div className="relative w-64">
        <div
          id={regionId}
          className={
            `peer border border-[var(--color-foreground)] border-r-0 rounded-l-full px-4 py-4 w-full cursor-pointer focus:outline-none bg-[var(--color-background)] ` +
            `${firstValue ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => setOpenMenu(openMenu === 'region' ? null : 'region')}
        >
          {selectedFirstLabel || firstLabel}
        </div>
        <label
          htmlFor={regionId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!firstValue && openMenu !== 'region' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `bg-[var(--color-background)] px-1 pointer-events-none`
          }
        >
          {firstLabel}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'region' && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {firstOptions.map((r) => (
              <li
                key={r.value}
                className={`px-4 py-2 cursor-pointer ${firstValue === r.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onFirstChange(r.value);
                  onSecondChange("");
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
            `${secondDisabled ? 'bg-[var(--color-foreground)]/20 cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `${secondValue ? 'text-[var(--color-foreground)]' : 'text-transparent'}`
          }
          onClick={() => {
            if (!secondDisabled) {
              setOpenMenu(openMenu === 'comuna' ? null : 'comuna');
            }
          }}
        >
          {selectedSecondLabel || secondLabel}
        </div>
        <label
          htmlFor={comunaId}
          className={
            `absolute left-4 text-[var(--color-foreground)] transition-all ` +
            `${!secondValue && openMenu !== 'comuna' ? 'top-4 text-base' : '-top-2 text-sm'} ` +
            `${secondDisabled ? 'bg-transparent cursor-not-allowed pointer-events-none' : 'bg-[var(--color-background)]'} ` +
            `px-1 pointer-events-none`
          }
        >
          {secondLabel}
        </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {openMenu === 'comuna' && !secondDisabled && (
          <ul className="absolute z-10 mt-2 w-full border border-[var(--color-foreground)] rounded-4xl shadow-lg bg-[var(--color-background)] max-h-60 overflow-y-auto">
            {secondOptions.map((c) => (
              <li
                key={c.value}
                className={`px-4 py-2 cursor-pointer ${secondValue === c.value ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'hover:bg-[var(--color-foreground)]/20'}`}
                onClick={() => {
                  onSecondChange(c.value);
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
