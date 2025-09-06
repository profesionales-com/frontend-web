import React from 'react';
import Select from '../../components/Select';

interface ProcedureProps {
    selectedProcedure: string;
    setSelectedProcedure: (exam: string) => void;
}

export default function ProcedureStep({
    selectedProcedure, setSelectedProcedure
}: ProcedureProps) {
    return (
        <div className="flex flex-row  justify-center w-fit">
            {/* Bloque Personal */}
            <div className="flex flex-col gap-4">
                <Select
                    label="Procedimiento"
                    value={selectedProcedure}
                    onChange={setSelectedProcedure}
                    options={[
                        { label: 'Cirugía menor', value: 'minor-surgery' },
                        { label: 'Cirugía mayor', value: 'major-surgery' },
                        { label: 'Endoscopia', value: 'endoscopy' },
                        { label: 'Colonoscopia', value: 'colonoscopy' },
                        { label: 'Artroscopia', value: 'arthroscopy' },
                        { label: 'Laparoscopia', value: 'laparoscopy' },
                        { label: 'Biopsia', value: 'biopsy' },
                        { label: 'Extracción de quiste', value: 'cyst-removal' },
                        { label: 'Cirugía plástica', value: 'plastic-surgery' },
                        { label: 'Cirugía ortopédica', value: 'orthopedic-surgery' },
                        { label: 'Cirugía cardiovascular', value: 'cardiovascular-surgery' },
                        { label: 'Cirugía neurológica', value: 'neurological-surgery' },
                        { label: 'Cirugía urológica', value: 'urological-surgery' },
                        { label: 'Cirugía ginecológica', value: 'gynecological-surgery' },
                    ]}
                    filterable={true} // Habilita el filtro
                />
            </div>
        </div>
    );
}