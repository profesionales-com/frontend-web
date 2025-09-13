import React from 'react';
import Select from '../../components/Select';

interface ConsultationProps {
    selectedPsychiatricAttentionType: string;
    setSelectedPsychiatricAttentionType: (type: string) => void;
    selectedSpecialty: string;
    setSelectedSpecialty: (val: string) => void;
    selectedDoctor: string;
    setSelectedDoctor: (val: string) => void;
}

export default function ConsultationStep({
    selectedPsychiatricAttentionType, setSelectedPsychiatricAttentionType,
    selectedSpecialty, setSelectedSpecialty,
    selectedDoctor, setSelectedDoctor
}: ConsultationProps) {
    return (
        <div className="flex md:flex-row flex-col justify-center w-fit gap-10 mb-6">
            {/* Bloque Personal */}
            <div className="flex flex-col gap-10">
                <Select
                    label="Especialidad"
                    value={selectedSpecialty}
                    onChange={setSelectedSpecialty}
                    options={[
                        { label: 'Medicina General', value: 'general' },
                        { label: 'Pediatría', value: 'pediatrics' },
                        { label: 'Ginecología', value: 'gynecology' },
                        { label: 'Dermatología', value: 'dermatology' },
                        { label: 'Otorrinolaringología', value: 'otolaryngology' },
                        { label: 'Cirugía', value: 'surgery' },
                        { label: 'Traumatología', value: 'traumatology' },
                        { label: 'Psiquiatría', value: 'psychiatry' },
                        { label: 'Oftalmología', value: 'ophthalmology' },
                        { label: 'Cardiología', value: 'cardiology' },
                    ]}
                    filterable={true} // Habilita el filtro
                />

                {
                    selectedSpecialty === 'psychiatry' &&
                    <Select
                        label="Tipo de atención psiquiátrica"
                        value={selectedPsychiatricAttentionType}
                        onChange={setSelectedPsychiatricAttentionType}
                        options={[
                            { label: 'Ingreso', value: 'admission' },
                            { label: 'Consulta', value: 'consultation' },
                        ]}
                    />
                }
            </div>
            {/* Bloque Servicio/Ubicación */}
            <div className="flex flex-col gap-10">
                <Select label="Médico/a" value={selectedDoctor} onChange={setSelectedDoctor} options={[
                    { label: 'Todos', value: 'all' },
                    { label: 'Dr. Juan Rodríguez', value: 'dr-juan-rodriguez' },
                    { label: 'Dr. Maria Lopez', value: 'dr-maria-lopez' },
                    { label: 'Dr. Carlos Pérez', value: 'dr-carlos-perez' },
                    { label: 'Dra. Ana Torres', value: 'dra-ana-torres' },
                    { label: 'Dra. Laura Gómez', value: 'dra-laura-gomez' },
                    { label: 'Dr. Luis Fernández', value: 'dr-luis-fernandez' },
                    { label: 'Dra. Paula Martínez', value: 'dra-paula-martinez' },
                    { label: 'Dr. Andrés Sánchez', value: 'dr-andres-sanchez' },
                ]} filterable />


            </div>
        </div>
    );
}