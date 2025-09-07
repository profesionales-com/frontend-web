// components/ProviderCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import type { Provider } from "@/app/search/page";

export default function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <div className=" rounded-4xl shadow-lg p-4 flex gap-4 items-start">
            <div className="w-20 h-20 rounded-full bg-[var(--color-foreground)] flex-shrink-0 overflow-hidden">
                <Image width={80} height={80} src={`/api/avatar/${provider.id}`} alt={'🧑🏻‍💼'} className="w-full h-full object-cover text-center items-center grid text-4xl" />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{provider.name}</h3>
                        <p className="text-sm text-[var(--color-foreground)]/50">
                            {provider.profession} • {provider.opinions} opiniones
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-[var(--color-foreground)]">desde</p>
                        <p className="font-semibold">${provider.priceFrom?.toLocaleString?.() ?? "—"}</p>
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 items-start">
                    <div>
                        <p className="text-sm text-[var(--color-foreground)]">{provider.address}</p>
                        {provider.online && <span className="inline-block mt-2 px-2 py-1 text-xs border rounded">Online</span>}
                    </div>

                    <div>
                        <div className=" p-2 rounded">
                            {provider.availabilities?.slice(0, 2).map((a) => (
                                <div key={a.day} className="mb-2">
                                    <div className="text-xs text-gray-500">{a.day}</div>
                                    <div className="flex gap-2 flex-wrap mt-1">
                                        {a.times.slice(0, 3).map((t) => (
                                            <button key={t} className="py-1 px-2 text-sm cursor-pointer border border-[var(--color-foreground)] rounded-full" type="button">
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
