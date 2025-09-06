import React, { useState, useMemo } from 'react';

interface AppointmentSchedulerProps {
  /**
   * Map of ISO date string (YYYY-MM-DD) to array of available time slots (e.g. ['09:00', '09:30'])
   */
  availableSlots: Record<string, string[]>;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function AppointmentScheduler({ availableSlots, selectedDate, setSelectedDate, selectedTime, setSelectedTime }: AppointmentSchedulerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthDays = useMemo(() => {
    const days: Date[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [currentMonth]);

  const prevMonth = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m - 1, 1));
  };

  const nextMonth = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m + 1, 1));
  };

  const monthLabel = currentMonth.toLocaleString('es-ES', {
    month: 'short',
    year: 'numeric',
  });
  const weekdayLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  return (
    <div className="flex flex-col md:flex-row bg-[var(--color-background)] text-[var(--color-foreground)] md:w-2xl w-full overflow-hidden">
      {/* Calendar */}
      <div className="md:w-2/3 w-full md:border-r-1 md:border-b-0 border-b-1 border-r-0 border-[var(--color-foreground)/20] p-4 relative">
        <div className="flex items-center justify-center mb-4 relative">
          <button
            onClick={prevMonth}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[var(--color-foreground)/10] focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-[var(--color-foreground)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold capitalize">{monthLabel}</h2>
          <button
            onClick={nextMonth}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[var(--color-foreground)/10] focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-[var(--color-foreground)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {weekdayLabels.map((d) => (
            <div key={d} className="font-medium opacity-70">{d}</div>
          ))}
          {monthDays.map((day) => {
            const iso = day.toISOString().slice(0, 10);
            const hasSlots = !!availableSlots[iso]?.length;
            const isSelected = selectedDate === iso;
            return (
              <button
                key={iso}
                onClick={() => hasSlots && (setSelectedDate(iso), setSelectedTime(''))}
                className={`h-8 flex items-center justify-center rounded-full transition-colors focus:outline-none
                  ${
                    isSelected
                      ? 'bg-[var(--color-foreground)] text-[var(--color-background)] cursor-pointer'
                      : hasSlots
                      ? 'bg-[var(--color-foreground)/10] hover:bg-[var(--color-foreground)/20] text-[var(--color-foreground)]  cursor-pointer'
                      : 'opacity-30 cursor-not-allowed'
                  }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="md:w-2/3 w-full p-4">
        <h3 className="text-lg font-semibold mb-2">
          {new Date(selectedDate).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {availableSlots[selectedDate]?.length ? (
            availableSlots[selectedDate].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 cursor-pointer border border-[var(--color-foreground)] rounded-full 
                    ${selectedTime === time ? 'bg-[var(--color-foreground)] text-[var(--color-background)]' : 'bg-[var(--color-foreground)/10] hover:bg-[var(--color-foreground)/20] text-[var(--color-foreground)]'}`}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="opacity-70 col-span-full">No hay horas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
