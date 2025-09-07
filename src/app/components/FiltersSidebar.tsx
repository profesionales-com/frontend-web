// components/FiltersSidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Select from "./Select";
import { atentionTypes, services } from "../data";

interface Props {
    service: string;
    region: string;
    regionOptions: { label: string; value: string }[];
    commune: string;
    communeOptions: { label: string; value: string }[];
    attention: string;
    onServiceChange: (v: string) => void;
    onRegionChange: (v: string) => void;
    onCommuneChange: (v: string) => void;
    onAttentionChange: (v: string) => void;
}

export default function FiltersSidebar({
    service,
    region,
    regionOptions,
    commune,
    communeOptions,
    attention,
    onServiceChange,
    onRegionChange,
    onCommuneChange,
    onAttentionChange,
}: Props) {
    

    return (
        <div className="p-4 rounded-4xl shadow-lg gap-5 grid">
            <h2 className="mb-3">Filtros</h2>

            <Select
                label="Servicio"
                options={services}
                value={service}
                onChange={(v) => onServiceChange(v)}
                className="mb-4"
            />

            <Select
                label="Región"
                options={regionOptions}
                value={region}
                onChange={(v) => onRegionChange(v)}
                className="mb-4"
            />

            <Select
                label="Comuna"
                options={communeOptions}
                value={commune}
                onChange={(v) => onCommuneChange(v)}
                className="mb-4"
            />

            <div className="flex gap-4">
                {atentionTypes.map(type => (
                    <button
                        key={type.value}
                        className={`border rounded-full px-2 py-1 text-md transition cursor-pointer ${attention === type.value
                            ? 'bg-[var(--color-foreground)] text-[var(--color-background)]'
                            : 'bg-[var(--color-background)] text-[var(--color-foreground)]'}`}
                        onClick={() => onAttentionChange(type.value)}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            <div className="mt-2">
                <button onClick={() => { }} className="w-full bg-foreground text-background py-2 rounded-full" type="button">
                    Aplicar
                </button>
            </div>
        </div>
    );
}
