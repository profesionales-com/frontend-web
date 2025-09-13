import React, { useEffect, useId, useRef, useState } from 'react';
import TextInput from '../../components/inputs/TextInput';

interface InitialInfoProps {
    selectedIdType: 'rut' | 'pasaporte';
    setSelectedIdType: (type: 'rut' | 'pasaporte') => void;
    idNumber: string;
    setIdNumber: (val: string) => void;

    name: string;
    setName: (val: string) => void;
    lastName: string;
    setLastName: (val: string) => void;
    birthDate: string;
    setBirthDate: (val: string) => void;

    email: string;
    setEmail: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
}

export default function InitialInfoStep({
    selectedIdType, setSelectedIdType,
    idNumber, setIdNumber,
    name, setName,
    lastName, setLastName,
    birthDate, setBirthDate,
    email, setEmail,
    phone, setPhone
}: InitialInfoProps) {
    return (
        <div className="flex md:flex-row flex-col justify-center w-fit gap-10 mb-6">
            {/* Bloque Personal */}
            <div className="flex flex-col gap-10 ">
                <div className='flex flex-col gap-6'>
                    <div className="flex gap-4">
                        {['rut', 'pasaporte'].map(type => (
                            <button
                                key={type}
                                className={`border rounded-full px-3 py-1 text-sm transition cursor-pointer ${selectedIdType === type
                                    ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                                    : 'bg-[var(--color-background)] text-[var(--color-foreground)]'}`}
                                onClick={() => setSelectedIdType(type as 'rut' | 'pasaporte')}
                            >
                                {type === 'rut' ? 'RUT' : 'Pasaporte'}
                            </button>
                        ))}
                    </div>
                    <TextInput label={selectedIdType === 'rut' ? 'RUT' : 'Pasaporte'} value={idNumber} onChange={setIdNumber} name="id-number" />
                </div>

                <TextInput label="Nombre" value={name} onChange={setName} name="name" />
                <TextInput label="Apellidos" value={lastName} onChange={setLastName} name="last-name" />
                
            </div>
            
            {/* Bloque Servicio/Ubicación */}
            <div className="flex flex-col gap-10">
                <TextInput label="Fecha de nacimiento" type="date" value={birthDate} onChange={setBirthDate} name="birth-date" />
                <TextInput label="Correo" value={email} onChange={setEmail} name="email" />
                <TextInput label="Teléfono" value={phone} onChange={setPhone} name="phone" />
            </div>
        </div>
    );
}