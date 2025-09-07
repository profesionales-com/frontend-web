// components/MapPanel.tsx
"use client";

import React, { useEffect } from "react";
import type { Provider } from "@/app/search/page";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

interface Props {
  providers: Provider[];
  latitude?: number;
  longitude?: number;
}

const DEFAULT_ZOOM = 13;

function FitBounds({ providers, DEFAULT_CENTER }: { providers: Provider[], DEFAULT_CENTER: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = providers
      .map((p) => p.location)
      .filter(Boolean)
      .map((loc) => [loc!.lat, loc!.lng]);

    if (points.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    // Ajusta los bounds para que se vean todos los markers
    map.fitBounds(points, { padding: [40, 40] });
  }, [providers, map]);

  return null;
}

export default function MapPanel({ providers, latitude, longitude }: Props) {
  const providersWithLocation = providers.filter((p) => p.location !== undefined) as (Provider & { location: { lat: number; lng: number } })[];
  const DEFAULT_CENTER: LatLngExpression = latitude && longitude ? [latitude, longitude] : [ -36.820135, -73.04439]; // Concepción por defecto

  return (

      <div  className="w-full h-120 rounded-4xl shadow-lg overflow-hidden">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          {/* Tiles gratuitos de OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds providers={providersWithLocation} DEFAULT_CENTER={DEFAULT_CENTER} />

          {providersWithLocation.map((p) => (
            <CircleMarker
              key={p.id}
              center={[p.location.lat, p.location.lng]}
              radius={8}
              pathOptions={{ fillColor: "#2563EB", color: "#1E40AF", weight: 1 }}
            >
              <Popup>
                <div className="max-w-xs">
                  <strong>{p.name}</strong>
                  <div className="text-sm text-gray-600">{p.profession}</div>
                  {p.address && <div className="text-sm mt-1">{p.address}</div>}
                  <div className="mt-2">
                    <small>Desde ${p.priceFrom?.toLocaleString() ?? "—"}</small>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
  );
}
