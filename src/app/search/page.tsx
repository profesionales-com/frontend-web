// app/search/page.tsx
import React from "react";
import SearchClient from "../components/SearchClient";

type SearchParams = {
    service?: string;
    region?: string;
    commune?: string;
    attentionType?: string;
};

type Availability = {
    day: string;
    times: string[];
};

export type Location = {
  lat: number;
  lng: number;
};

export type Provider = {
  id: string;
  name: string;
  profession: string;
  rating: number;
  opinions: number;
  address?: string;
  online?: boolean;
  priceFrom?: number;
  availabilities?: Availability[];
  location?: Location; // <-- lat/lng opcional
};

async function fetchProviders(_params: SearchParams): Promise<Provider[]> {
    // mock — reemplaza por fetch a tu API
    return [
        {
            id: "1",
            name: "Dr. Jaime Eduardo Batarce Reyes",
            profession: "Médico general",
            rating: 4.8,
            opinions: 42,
            address: "Concepción, Concepción",
            online: true,
            priceFrom: 35000,
            availabilities: [
                { day: "Hoy", times: ["10:00", "10:30", "11:00", "11:30"] },
                { day: "Mañana", times: ["10:00", "10:30", "11:00"] },
            ],
        },
        {
            id: "2",
            name: "Dr. Hernani Pradenas Hermosilla",
            profession: "Médico general",
            rating: 4.9,
            opinions: 390,
            address: "Barros Arana 741, Concepción",
            online: false,
            priceFrom: 30000,
            availabilities: [{ day: "Hoy", times: ["09:00", "11:00", "12:00"] }],
        },
        {
            id: "3",
            name: "Dra. María Angélica Pérez Soto",
            profession: "Dentista",
            rating: 4.7,
            opinions: 85,
            address: "Santiago, Santiago",
            online: true,
            priceFrom: 45000,
            availabilities: [
                { day: "Hoy", times: ["14:00", "15:00"] },
                { day: "Mañana", times: ["10:00", "11:00", "12:00"] },
            ],
        },
        {
            id: "4",
            name: "Lic. Carlos Muñoz Vargas",
            profession: "Psicólogo",
            rating: 4.6,
            opinions: 120,
            address: "Providencia, Santiago",
            online: true,
            priceFrom: 40000,
            availabilities: [
                { day: "Hoy", times: ["16:00", "17:00"] },
                { day: "Mañana", times: ["09:00", "10:00", "11:00"] },
            ],
        },
    ];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const initialResults = await fetchProviders({
    service: searchParams?.service as string | undefined,
    region: searchParams?.region as string | undefined,
    commune: searchParams?.commune as string | undefined,
    attentionType: searchParams?.attentionType as string | undefined,
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <SearchClient
          initialSearchParams={searchParams}
          initialResults={initialResults}
        />
      </div>
    </div>
  );
}

