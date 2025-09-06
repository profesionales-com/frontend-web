import React, { useEffect, useId, useRef, useState } from 'react';
import TextInput from '../../components/inputs/TextInput';
import Select from '../../components/Select';

interface InitialInfoProps {
    selectedIdType: 'rut' | 'pasaporte';
    setSelectedIdType: (type: 'rut' | 'pasaporte') => void;
    idNumber: string;
    setIdNumber: (val: string) => void;
    selectedInsurance: string;
    setSelectedInsurance: (val: string) => void;
    selectedServiceType: string;
    setSelectedServiceType: (val: string) => void;
    selectedAttentionType: string;
    setSelectedAttentionType: (val: string) => void;
    selectedAttentionPlace: string;
    setSelectedAttentionPlace: (val: string) => void;
    regionOptions: { label: string; value: string }[];
    communeOptions: { label: string; value: string }[];
    selectedRegion: string;
    setSelectedRegion: (val: string) => void;
    selectedCommune: string;
    setSelectedCommune: (val: string) => void;
}

export default function InitialInfoStep({
    selectedIdType, setSelectedIdType,
    idNumber, setIdNumber,
    selectedInsurance, setSelectedInsurance,
    selectedServiceType, setSelectedServiceType,
    selectedAttentionType, setSelectedAttentionType,
    selectedAttentionPlace, setSelectedAttentionPlace,
    regionOptions, communeOptions,
    selectedRegion, setSelectedRegion,
    selectedCommune, setSelectedCommune,
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

                <Select
                    label="Previsión"
                    value={selectedInsurance}
                    onChange={setSelectedInsurance}
                    options={[
                        { label: "Fonasa", value: "fonasa" },
                        { label: "Isapre 1", value: "isapre-1" },
                        { label: "Isapre 2", value: "isapre-2" },
                        { label: "Isapre 3", value: "isapre-3" },
                        { label: "Isapre 4", value: "isapre-4" },
                        { label: "Isapre 5", value: "isapre-5" },
                        { label: "Particular", value: "particular" },
                    ]}
                />
            </div>
            {/* Bloque Servicio/Ubicación */}
            <div className="flex flex-col gap-10">
                <Select label="Tipo de servicio" value={selectedServiceType} onChange={setSelectedServiceType} options={[
                    { label: 'Consulta médica', value: 'consultation' },
                    { label: 'Exámenes', value: 'examination' },
                    { label: 'Procedimiento', value: 'procedure' },
                ]} />

                {selectedServiceType === 'consultation' && (
                    <Select label="Tipo de atención" value={selectedAttentionType} onChange={setSelectedAttentionType} options={[
                        { label: 'Presencial', value: 'presencial' },
                        { label: 'Telemedicina', value: 'remote' },
                        { label: 'Domicilio', value: 'onSite' },
                    ]} />
                )}

                {(selectedServiceType === 'examination' || selectedServiceType === 'procedure' || selectedAttentionType === 'presencial') && (
                    <Select
                        label="Lugar de atención"
                        value={selectedAttentionPlace}
                        onChange={setSelectedAttentionPlace}
                        options={[
                            { label: "Clínica Central", value: "central" },
                            { label: "Sucursal Norte", value: "north" },
                            { label: "Sucursal Sur", value: "south" },
                            { label: "Sucursal Oriente", value: "east" },
                        ]}
                    />
                )}
                {
                    (selectedServiceType === 'consultation' && selectedAttentionType === 'onSite') &&
                    (
                        <div className='flex flex-col gap-10'>

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
                    )
                }
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