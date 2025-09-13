'use client';
import { useState, useEffect } from 'react';
import Stepper, { StepInterface } from '../components/Stepper';
import InitialInfoStep from './steps/InitialInfoStep';
import ServiceStep from './steps/ServiceStep';

export default function ProfessionalSignup() {
  const [step, setStep] = useState<number>(0);

  // Estados de identificación
  const [selectedIdType, setSelectedIdType] = useState<'rut' | 'pasaporte'>('rut');
  const [idNumber, setIdNumber] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Estados de región/comuna
  const [regionOptions, setRegionOptions] = useState<{ label: string; value: string }[]>([]);
  const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  // Estados de servicio
  const [selectedServiceArea, setSelectedServiceArea] = useState<string>('');
  const [selectedServiceSpecialty, setSelectedServiceSpecialty] = useState<string>('');

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
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />
      ),
    },
    // {
    //   title: 'Servicio',
    //   content: (
    //     selectedServiceType === 'consultation' ? (
    //       <div>
    //         {/* Contenido específico para Consulta Médica */}
    //         <ConsultationStep
    //           selectedPsychiatricAttentionType={selectedPsychiatricAttentionType}
    //           setSelectedPsychiatricAttentionType={setSelectedPsychiatricAttentionType}
    //           selectedDoctor={selectedDoctor}
    //           setSelectedDoctor={setSelectedDoctor}
    //           selectedSpecialty={selectedSpecialty}
    //           setSelectedSpecialty={setSelectedSpecialty}
    //         />
    //       </div>
    //     ) : selectedServiceType === 'examination' ? (
    //       <div>
    //         {/* Contenido específico para Exámenes */}
    //         <ExaminationStep
    //           selectedExam={selectedExam}
    //           setSelectedExam={setSelectedExam}
    //         />
    //       </div>
    //     ) : selectedServiceType === 'procedure' ? (
    //       <div>
    //         {/* Contenido específico para Procedimientos */}
    //         <ProcedureStep
    //           selectedProcedure={selectedProcedure}
    //           setSelectedProcedure={setSelectedProcedure}
    //         />
    //       </div>
    //     ) : null
    //   ),
    // },
    {
      title: 'Servicio',
      content: (
        <ServiceStep
          regionOptions={regionOptions}
          communeOptions={communeOptions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCommune={selectedCommune}
          setSelectedCommune={setSelectedCommune}
          selectedServiceArea={selectedServiceArea}
          setSelectedServiceArea={setSelectedServiceArea}
          selectedServiceSpecialty={selectedServiceSpecialty}
          setSelectedServiceSpecialty={setSelectedServiceSpecialty}
          
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
        // <SummaryStep
        //   selectedIdType={selectedIdType}
        //   idNumber={idNumber}
        //   selectedInsurance={selectedInsurance}
        //   selectedServiceType={selectedServiceType}
        //   selectedAttentionType={selectedAttentionType}
        //   selectedAttentionPlace={selectedAttentionPlace}
        //   selectedRegion={selectedRegion}
        //   selectedCommune={selectedCommune}
        //   selectedSpecialty={selectedSpecialty}
        //   selectedPsychiatricAttentionType={selectedPsychiatricAttentionType}
        //   selectedDoctor={selectedDoctor}
        //   selectedDate={selectedDate}
        //   selectedTime={selectedTime}
        //   selectedExam={selectedExam}
        //   selectedProcedure={selectedProcedure}
        // />
        <div></div>
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
            // disabled={
            //   (step === 0 && !isStep0Valid) ||
            //   (step === 1 && !isStep1Valid) ||
            //   (step === 2 && (!selectedDate || !selectedTime))
            // }
            className={`px-4 py-2 rounded-full transition
                ${
              // ((step === 0 && !isStep0Valid) ||
              // (step === 1 && !isStep1Valid) ||
              // (step === 2 && (!selectedDate || !selectedTime)))
              // ? 'bg-[var(--color-foreground)]/20 text-[var(--color-background)]'
              // : 
              'bg-[var(--color-foreground)] text-[var(--color-background)] cursor-pointer'
              }
                `}
          >
            {step === 3 ? 'Confirmar' : 'Siguiente'}
          </button>
        )}
      </div>
    </div>
  </div>
);
}
