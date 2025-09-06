'use client';
import { useState } from "react";
import TextInput from "../components/inputs/TextInput";

export default function CancelAppointment() {
  const [selected, setSelected] = useState<'rut' | 'pasaporte' | null>('rut');
  const [idNumber, setIdNumber] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');

  return (
    <div className="w-full items-center justify-center flex">
      <div className="flex flex-col items-center justify-center bg-[var(--color-background)] md:shadow-lg shadow-none m-10 p-10 w-fit rounded-4xl gap-6">
        <p className="text-2xl font-bold">Anular hora</p>

        {/* Selector */}
        <div className="flex gap-4">
          <button
            className={`border rounded-full cursor-pointer px-4 py-2 transition ${selected === 'rut' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
              }`}
            onClick={() => setSelected('rut')}
          >
            RUT
          </button>
          <button
            className={`border rounded-full cursor-pointer px-4 py-2 transition ${selected === 'pasaporte' ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-background)] text-[var(--color-foreground)]'
              }`}
            onClick={() => setSelected('pasaporte')}
          >
            Pasaporte
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col items-center">
          <TextInput
            label={selected === 'rut' ? 'RUT' : 'Pasaporte'}
            value={idNumber}
            onChange={setIdNumber}
            name="id-number"
            className="mt-2 w-80"
          />
          <TextInput
            label="Número de reserva"
            value={appointmentNumber}
            onChange={setAppointmentNumber}
            name="appointment-number"
            className="mt-6 w-80"
          />
        </div>

        {/* Submit button */}
        <button
          className="bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-full cursor-pointer self-end"
        >
          Anular
        </button>

      </div>
    </div>
  );
}
