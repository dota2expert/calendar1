import type { DayData, Norms } from "../types/ClearCalendar/calendar";

export const norms: Norms = {
    B1: { daily: 100, weekly: 500 },
    B2: { daily: 121, weekly: 605 },
    B3: { daily: 17.3, weekly: 86.5 },
    B4: { daily: 10, weekly: 50 },
    C1: { daily: 23, weekly: 115 },
    C2: { daily: 13, weekly: 65 },
    C3: { daily: 5, weekly: 25 },
    D1: { daily: 80, weekly: 400 },
    D2: { daily: 140, weekly: 700 },
    E1: { daily: 0.8, weekly: 4 },
    E2: { daily: 0.8, weekly: 4 },
    T1: { daily: 35, weekly: 175 },
    T2: { daily: 12, weekly: 60 },
    T3: { daily: 30, weekly: 150 },
}; 

export const sampleWeek: DayData[] = [
    { date: "2025-09-15", facts: { B1: 46.44, B2: 136.66, D1: 187.17, D2: 201.34, T1: 55.51, T2: 23.21, T3: 37.48 } },
    { date: "2025-09-16", facts: { B1: 82.56, B2: 149.77, C2: 12.59, D1: 118.31, D2: 188.31, T1: 63.06, T2: 18.41, T3: 34.45 } },
    { date: "2025-09-17", facts: { B1: 48.62, B2: 278.34, B4: 27.14, C1: 58.55, D1: 45.89, D2: 152.25, T1: 32.08, T2: 30.84, T3: 34.79 } },
    { date: "2025-09-18", facts: { B1: 37.42, C1: 20.37, C2: 18.14, D1: 185.75, D2: 186.14, T1: 56.55, T2: 28.45, T3: 42.67 } },
    { date: "2025-09-19", facts: { B1: 21, B4: 84.74, D1: 100.21, T1: 3.57, T2: 22.54, T3: 23.96 } },
]