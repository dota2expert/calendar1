export interface Day { 
    date: Date;
    number: number;
    isToday: boolean;
    isCurrentMonth: boolean;
    isSelected?: boolean;
    facts?: Record<string, number> | null; 
}

export interface DayData {
  date: string;
  facts: Record<string, number>;
}

export interface Norms {
  [key: string]: { daily: number; weekly: number };
}

export interface CalendarProps {
  norms: Norms;
  weekData: DayData[];
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  locale?: string;
}

export function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

export function getCalendarDays(currentDate: Date, selectedDate: Date | null): Day[] {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    let firstDayOfWeek = firstDayOfMonth.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const prevMonthDays: Day[] = [];
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, daysInPrevMonth - i);
        prevMonthDays.push({
            date,
            number: date.getDate(),
            isToday: isToday(date),
            isCurrentMonth: false,
            isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        });
    }
    
    const currentMonthDays: Day[] = [];
    const daysInMonth = lastDayOfMonth.getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        currentMonthDays.push({
            date,
            number: day,
            isToday: isToday(date),
            isCurrentMonth: true,
            isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        });
    }
    
    const nextMonthDays: Day[] = [];
    const totalDaysNeeded = 42;
    const daysToAdd = totalDaysNeeded - (prevMonthDays.length + currentMonthDays.length);
    
    for (let day = 1; day <= daysToAdd; day++) {
        const date = new Date(year, month + 1, day);
        nextMonthDays.push({
            date,
            number: date.getDate(),
            isToday: isToday(date),
            isCurrentMonth: false,
            isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

export function getPreviousMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function getNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}