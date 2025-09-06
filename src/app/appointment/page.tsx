'use client';
import { useState, useEffect, useMemo } from 'react';
import Stepper, { StepInterface } from '../components/Stepper';
import InitialInfoStep from './steps/InitialInfoStep';
import ConsultationStep from './steps/ConsultationStep';
import DateTimeStep from './steps/DateTimeStep';
import SummaryStep from './steps/SummaryStep';
import ExaminationStep from './steps/ExaminationStep';
import ProcedureStep from './steps/ProcedureStep';

export default function Appointment() {
  const [step, setStep] = useState<number>(0);

  // Estados de identificación
  const [selectedIdType, setSelectedIdType] = useState<'rut' | 'pasaporte'>('rut');
  const [idNumber, setIdNumber] = useState<string>('');

  // Estados de previsión y servicio
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [selectedAttentionType, setSelectedAttentionType] = useState<string>('');
  const [selectedAttentionPlace, setSelectedAttentionPlace] = useState<string>('');

  // Estados de región/comuna
  const [regionOptions, setRegionOptions] = useState<{ label: string; value: string }[]>([]);
  const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  // Estados para consultas médicas
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedPsychiatricAttentionType, setSelectedPsychiatricAttentionType] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all');

  // Estados para exámenes y procedimientos
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');

  // Estado para fecha y hora
  const [availableSlots, setAvailableSlots] = useState<Record<string, string[]>>({
    '2025-07-22': ['09:00', '09:30', '10:00', '10:30'],
    '2025-07-24': ['09:00', '09:30', '10:00', '10:30'],
  });
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Estado de confirmación
  const [confirmed, setConfirmed] = useState<boolean>(false);

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

  // Validación del paso inicial
  const isStep0Valid = useMemo(() => {
    if (!selectedIdType || !idNumber || !selectedInsurance || !selectedServiceType) return false;

    switch (selectedServiceType) {
      case 'consultation':
        switch (selectedAttentionType) {
          case 'presencial':
            return !!selectedAttentionPlace;
          case 'remote':
            return true;
          case 'onSite':
            return !!selectedRegion && !!selectedCommune;
          default:
            return false;
        }
      case 'examination':
      case 'procedure':
        return !!selectedAttentionPlace;
      default:
        break;
    }
  }, [
    selectedIdType,
    idNumber,
    selectedInsurance,
    selectedServiceType,
    selectedAttentionType,
    selectedAttentionPlace,
    selectedRegion,
    selectedCommune,
  ]);

  const isStep1Valid = useMemo(() => {
    switch (selectedServiceType) {
      case 'consultation':
        return !!selectedSpecialty && !!selectedDoctor && (
          selectedPsychiatricAttentionType || selectedSpecialty !== 'psychiatry'
        );
      case 'examination':
      case 'procedure':
        return true; // Aquí podrías agregar más validaciones si es necesario
      default:
        return false;
    }
  }, [selectedServiceType, selectedSpecialty, selectedDoctor, selectedPsychiatricAttentionType]);

  // Definición dinámica de steps
  const steps: StepInterface[] = [
    {
      title: 'Información inicial',
      content: (
        <InitialInfoStep
          selectedIdType={selectedIdType}
          setSelectedIdType={setSelectedIdType}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          selectedInsurance={selectedInsurance}
          setSelectedInsurance={setSelectedInsurance}
          selectedServiceType={selectedServiceType}
          setSelectedServiceType={setSelectedServiceType}
          selectedAttentionType={selectedAttentionType}
          setSelectedAttentionType={setSelectedAttentionType}
          selectedAttentionPlace={selectedAttentionPlace}
          setSelectedAttentionPlace={setSelectedAttentionPlace}
          regionOptions={regionOptions}
          communeOptions={communeOptions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCommune={selectedCommune}
          setSelectedCommune={setSelectedCommune}
        />
      ),
    },
    {
      title: 'Servicio',
      content: (
        selectedServiceType === 'consultation' ? (
          <div>
            {/* Contenido específico para Consulta Médica */}
            <ConsultationStep
              selectedPsychiatricAttentionType={selectedPsychiatricAttentionType}
              setSelectedPsychiatricAttentionType={setSelectedPsychiatricAttentionType}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
            />
          </div>
        ) : selectedServiceType === 'examination' ? (
          <div>
            {/* Contenido específico para Exámenes */}
            <ExaminationStep
              selectedExam={selectedExam}
              setSelectedExam={setSelectedExam}
            />
          </div>
        ) : selectedServiceType === 'procedure' ? (
          <div>
            {/* Contenido específico para Procedimientos */}
            <ProcedureStep
              selectedProcedure={selectedProcedure}
              setSelectedProcedure={setSelectedProcedure}
            />
          </div>
        ) : null
      ),
    },
    {
      title: 'Fecha y hora',
      content: (
        <DateTimeStep
          availableSlots={availableSlots}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      ),
    },
    {
      title: 'Confirmación',
      content: confirmed
        ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">¡Cita confirmada!</h2>
            <p>Te enviamos todos los detalles al correo registrado. Recuerda llegar 15 minutos antes si tienes atención presencial.</p>
          </div>
        )
        : (
          <SummaryStep
            selectedIdType={selectedIdType}
            idNumber={idNumber}
            selectedInsurance={selectedInsurance}
            selectedServiceType={selectedServiceType}
            selectedAttentionType={selectedAttentionType}
            selectedAttentionPlace={selectedAttentionPlace}
            selectedRegion={selectedRegion}
            selectedCommune={selectedCommune}
            selectedSpecialty={selectedSpecialty}
            selectedPsychiatricAttentionType={selectedPsychiatricAttentionType}
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedExam={selectedExam}
            selectedProcedure={selectedProcedure}
          />
        ),
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] md:shadow-lg shadow-none w-fit m-10 p-10 rounded-4xl gap-6">
        <Stepper currentStep={step} steps={steps} />

        <div className="flex justify-between w-xs">
          {/* ⬅️ Volver */}
          {!(step === 3 && confirmed) && (
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              className={`bg-[var(--color-foreground)]/20 text-[var(--color-foreground)] px-4 py-2 cursor-pointer rounded-full transition
                ${step === 0 ? 'invisible' : 'visible'}`}
            >
              Anterior
            </button>
          )}

          {/* Siguiente / Confirmar */}
          {!(step === 3 && confirmed) && (
            <button
              onClick={() => {
                if (step === 3) {
                  // Al hacer click en “Confirmar”
                  setConfirmed(true);
                } else {
                  setStep(s => Math.min(steps.length - 1, s + 1));
                }
              }}
              disabled={
                (step === 0 && !isStep0Valid) ||
                (step === 1 && !isStep1Valid) ||
                (step === 2 && (!selectedDate || !selectedTime))
              }
              className={`px-4 py-2 rounded-full transition
                ${((step === 0 && !isStep0Valid) ||
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && (!selectedDate || !selectedTime)))
                  ? 'bg-[var(--color-foreground)]/20 text-[var(--color-background)]'
                  : 'bg-[var(--color-foreground)] text-[var(--color-background)] cursor-pointer'
                }`}
            >
              {step === 3 ? 'Confirmar' : 'Siguiente'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
