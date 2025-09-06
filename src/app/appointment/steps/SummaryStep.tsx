import React from 'react';

interface SummaryProps {
  selectedIdType: 'rut' | 'pasaporte';
  idNumber: string;
  selectedInsurance: string;
  selectedServiceType: string;
  selectedAttentionType: string;
  selectedAttentionPlace: string;
  selectedRegion: string;
  selectedCommune: string;
  selectedSpecialty: string;
  selectedPsychiatricAttentionType: string;
  selectedDoctor: string;
  selectedExam: string;
  selectedProcedure: string;
  selectedDate: string;
  selectedTime: string;
}

export default function SummaryStep({
  selectedIdType,
  idNumber,
  selectedInsurance,
  selectedServiceType,
  selectedAttentionType,
  selectedAttentionPlace,
  selectedRegion,
  selectedCommune,
  selectedSpecialty,
  selectedPsychiatricAttentionType,
  selectedDoctor,
  selectedExam,
  selectedProcedure,
  selectedDate,
  selectedTime,
}: SummaryProps) {
  return (
    <div className="space-y-4 text-left">
      <h2 className="text-xl font-semibold">Resumen de tu cita</h2>

      <p>
        <strong>Identificación:</strong> {selectedIdType === 'rut' ? 'RUT' : 'Pasaporte'} – {idNumber}
      </p>
      <p><strong>Previsión:</strong> {selectedInsurance}</p>
      <p><strong>Servicio:</strong> {
        {
          consultation: 'Consulta médica',
          examination: 'Exámenes',
          procedure: 'Procedimiento',
        }[selectedServiceType]
      }</p>

      {/* Detalles por tipo de servicio */}
      {selectedServiceType === 'consultation' && (
        <>
          <p>
            <strong>Tipo de atención:</strong> {
            {
              presencial: 'Presencial',
              remote: 'Telemedicina',
              onSite: 'Domicilio',
            }[selectedAttentionType]
          }</p>

          {selectedAttentionType === 'onSite' && (
            <p><strong>Ubicación:</strong> Región {selectedRegion}, Comuna {selectedCommune}</p>
          )}

          <p><strong>Especialidad:</strong> {selectedSpecialty}</p>
          {selectedSpecialty === 'psychiatry' && (
            <p>
              <strong>Atención psiquiátrica:</strong> {
              {
                admission: 'Ingreso',
                consultation: 'Consulta',
              }[selectedPsychiatricAttentionType]
            }</p>
          )}
          <p><strong>Médico/a:</strong> {selectedDoctor}</p>
        </>
      )}

      {selectedServiceType === 'examination' && (
        <>
          <p><strong>Examen seleccionado:</strong> {selectedExam}</p>
          <p><strong>Lugar de atención:</strong> {selectedAttentionPlace}</p>
        </>
      )}

      {selectedServiceType === 'procedure' && (
        <>
          <p><strong>Procedimiento seleccionado:</strong> {selectedProcedure}</p>
          <p><strong>Lugar de atención:</strong> {selectedAttentionPlace}</p>
        </>
      )}

      {/* Fecha y hora */}
      <p><strong>Fecha y hora:</strong> {selectedDate} a las {selectedTime}</p>
    </div>
  );
}
