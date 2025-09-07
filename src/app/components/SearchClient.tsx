// components/SearchClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FiltersSidebar from "./FiltersSidebar";
import ProviderCard from "./ProviderCard";
import MapPanel from "./MapPanel";
import type { Provider } from "@/app/search/page";

type SearchParamsPartial = Partial<Record<"service" | "region" | "commune" | "attention", string>>;

interface Props {
    initialSearchParams?: Record<string, string | undefined>;
    initialResults: Provider[];
}

export default function SearchClient({ initialSearchParams = {}, initialResults }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [service, setService] = useState<string>(() => searchParams.get("service") ?? initialSearchParams.service ?? "");
    const [region, setRegion] = useState<string>(() => searchParams.get("region") ?? initialSearchParams.region ?? "");
    const [commune, setCommune] = useState<string>(() => searchParams.get("commune") ?? initialSearchParams.commune ?? "");
    const [attentionType, setAttentionType] = useState<string>(() => searchParams.get("attentionType") ?? initialSearchParams.attentionType ?? "");

    const [results, setResults] = useState<Provider[]>(initialResults);
    const [loading, setLoading] = useState<boolean>(false);

    const [regionOptions, setRegionOptions] = useState<{ label: string; value: string, latitude: number, longitude: number }[]>([]);
    const [communeOptions, setCommuneOptions] = useState<{ label: string; value: string, latitude: number, longitude: number }[]>([]);

    useEffect(() => {
        fetch('/api/regions')
            .then(res => res.json())
            .then((data: { nombre: string; codigo: string, lat: number, lng: number }[]) => {
                setRegionOptions(data.map(r => ({ label: r.nombre, value: r.codigo, latitude: r.lat, longitude: r.lng })));
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!region) return;
        fetch(`/api/regions/${region}/communes`)
            .then(res => res.json())
            .then((data: { nombre: string; codigo: string, lat: number, lng: number }[]) => {
                setCommuneOptions(data.map(c => ({ label: c.nombre, value: c.codigo, latitude: c.lat, longitude: c.lng })));
            })
            .catch(console.error);
    }, [region]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (service) params.set("service", service);
        if (region) params.set("region", region);
        if (commune) params.set("commune", commune);
        if (attentionType) params.set("attentionType", attentionType);

        const url = `/search${params.toString() ? `?${params.toString()}` : ""}`;
        router.push(url);

        async function load(): Promise<void> {
            setLoading(true);
            try {
                // Reemplaza con fetch real a tu /api/search?${params.toString()}
                // const res = await fetch(`/api/search?${params.toString()}`);
                // const data: Provider[] = await res.json();
                // setResults(data);

                // Mock: filtrado simple sobre initialResults
                const filtered = initialResults.filter((p) => {
                    if (service && !p.profession.toLowerCase().includes(service.toLowerCase())) return false;
                    if (region && !(p.address ?? "").toLowerCase().includes(region.toLowerCase())) return false;
                    if (commune && !(p.address ?? "").toLowerCase().includes(commune.toLowerCase())) return false;
                    if (attentionType) {
                        // ejemplo: remote -> online true; presencial -> online false
                        if (attentionType === "remote" && p.online !== true) return false;
                        if (attentionType === "presencial" && p.online === true) return false;
                    }
                    return true;
                });
                setResults(filtered.length ? filtered : initialResults);
            } catch (error) {
                console.error("Error cargando resultados:", error);
            } finally {
                setLoading(false);
            }
        }

        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service, region, commune, attentionType]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
                <div className="sticky top-24">
                    <FiltersSidebar
                        service={service}
                        region={region}
                        regionOptions={regionOptions}
                        commune={commune}
                        communeOptions={communeOptions}
                        attention={attentionType}
                        onServiceChange={setService}
                        onRegionChange={(v) => { setRegion(v); setCommune(""); }}
                        onCommuneChange={setCommune}
                        onAttentionChange={setAttentionType}
                    />
                </div>
            </aside>

            <main className="lg:col-span-6">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold">Resultados</h1>
                    <p className="text-sm text-[var(--color-foreground)]/70">
                        {results.length} profesionales encontrados
                        {region && regionOptions.length > 0 &&
                            commune && communeOptions.length > 0 ?
                            ` en ${communeOptions.find((c) => c.value === commune)?.label}, ${regionOptions.find((r) => r.value === region)?.label}`
                            : ""}
                    </p>
                </div>

                <div className="space-y-4">
                    {loading && <div className="p-6  rounded shadow">Cargando...</div>}

                    {!loading && results.length === 0 && <div className="p-6 rounded shadow">No se encontraron resultados</div>}

                    {results.map((r) => (
                        <ProviderCard key={r.id} provider={r} />
                    ))}
                </div>
            </main>

            <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                    <MapPanel providers={results} latitude={commune ? communeOptions.find((c) => c.value === commune)?.latitude : regionOptions.find((r) => r.value === region)?.latitude} longitude={commune ? communeOptions.find((c) => c.value === commune)?.longitude : regionOptions.find((r) => r.value === region)?.latitude} />
                </div>
            </div>
        </div>
    );
}
