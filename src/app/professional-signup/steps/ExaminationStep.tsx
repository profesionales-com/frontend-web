import React from 'react';
import Select from '../../components/Select';

interface ExaminationProps {
    selectedExam: string;
    setSelectedExam: (exam: string) => void;
}

export default function ExaminationStep({
    selectedExam, setSelectedExam
}: ExaminationProps) {
    return (
        <div className="flex flex-row  justify-center w-fit">
            {/* Bloque Personal */}
            <div className="flex flex-col gap-4">
                <Select
                    label="Examen"
                    value={selectedExam}
                    onChange={setSelectedExam}
                    options={[
                        { label: 'Examen de sangre', value: 'blood-test' },
                        { label: 'Radiografía', value: 'x-ray' },
                        { label: 'Ultrasonido', value: 'ultrasound' },
                        { label: 'Tomografía', value: 'ct-scan' },
                        { label: 'Resonancia magnética', value: 'mri' },
                        { label: 'Electrocardiograma', value: 'ecg' },
                        { label: 'Ecocardiograma', value: 'echocardiogram' },
                        { label: 'Análisis de orina', value: 'urine-test' },
                        { label: 'Prueba de función pulmonar', value: 'pulmonary-function-test' },
                        { label: 'Biopsia', value: 'biopsy' },
                    ]}
                    filterable={true} // Habilita el filtro
                />
            </div>
        </div>
    );
}