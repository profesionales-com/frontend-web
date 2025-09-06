// app/api/regions/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://apis.digital.gob.cl/dpa/regiones');
  const data = await res.json();

  return NextResponse.json(data);
}
