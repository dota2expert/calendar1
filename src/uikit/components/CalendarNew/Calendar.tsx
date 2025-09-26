import React, { useState } from "react";
import { getCalendarDays, getPreviousMonth, getNextMonth } from "../../../types/ClearCalendar/interfaceCalendar";
import type { Day } from "../../../types/ClearCalendar/interfaceCalendar";
import { norms, sampleWeek } from "../../../data/calendarMock";
import "../../styles/Calendar.css"

const CalendarNew: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedStation, setSelectedStation] = useState<string>("Все"); 

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const getDayData = (date: Date): Record<string, number> | null => {
        const dateString = date.toISOString().split('T')[0];
        const dayData = sampleWeek.find(day => day.date === dateString);
        return dayData ? dayData.facts : null;
    };

    const days = getCalendarDays(currentDate, selectedDate).map(day => ({
        ...day,
        facts: getDayData(day.date)
    }));

    const getMonthYear = (date: Date) => {
        return date.toLocaleString('ru-RU', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const getDayProgress = (facts: Record<string, number> | null | undefined): number => {
        if (!facts) return 0;
        
        if (selectedStation === "Все") {
            const totalFact = Object.values(facts).reduce((sum, fact) => sum + fact, 0);
            const totalNorm = Object.values(norms).reduce((sum, norm) => sum + norm.daily, 0);
            return totalNorm > 0 ? (totalFact / totalNorm) * 100 : 0;
        } else {
            const fact = facts[selectedStation] || 0;
            const norm = norms[selectedStation]?.daily || 0;
            return norm > 0 ? (fact / norm) * 100 : 0;
        }
    };

    const getDayValue = (facts: Record<string, number> | null | undefined): string => {
        if (!facts) return "0";
        
        if (selectedStation === "Все") {
            const total = Object.values(facts).reduce((sum, fact) => sum + fact, 0);
            return total.toFixed(0);
        } else {
            const value = facts[selectedStation] || 0;
            return value.toFixed(0);
        }
    };

    const handlePreviousMonth = () => {
        setCurrentDate(getPreviousMonth(currentDate));
    };

    const handleNextMonth = () => {
        setCurrentDate(getNextMonth(currentDate));
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDate(today);
    };

    const handleDayClick = (day: Day) => {
        setSelectedDate(day.date);
    };

    const selectedDayData = selectedDate ? getDayData(selectedDate) : null;

    return (
        <div className="calendar-wrapper">
            <div className="calendar-with-sidebar">
                <div className="calendar-main">
                    <div className="calendar-header">
                        <button 
                            className="calendar-nav-button"
                            onClick={handlePreviousMonth}
                            aria-label="Предыдущий месяц"
                        >
                            ‹
                        </button>
                        
                        <h2 className="calendar-title">
                            {getMonthYear(currentDate)}
                        </h2>
                        
                        <button 
                            className="calendar-nav-button"
                            onClick={handleNextMonth}
                            aria-label="Следующий месяц"
                        >
                            ›
                        </button>
                    </div>

                    <div className="station-filter">
                        <label>Станок: </label>
                        <select 
                            value={selectedStation} 
                            onChange={(e) => setSelectedStation(e.target.value)}
                            className="station-select"
                        >
                            <option value="Все">Все станки</option>
                            {Object.keys(norms).map(station => (
                                <option key={station} value={station}>{station}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        className="calendar-today-button"
                        onClick={handleToday}
                    >
                        Сегодня
                    </button>

                    <div className="calendar-weekdays">
                        {weekDays.map(day => (
                            <div key={day} className="calendar-weekday">
                                {day}
                            </div>
                        ))}
                    </div>
                    
                    <div className="calendar-grid">
                       {days.map(day => {
                                const progress = getDayProgress(day.facts);
                                const value = getDayValue(day.facts);
                                const hasData = day.facts !== null && day.facts !== undefined;
                                
                                const getLoadLevel = (progress: number) => {
                                    if (progress < 90) return 'low';
                                    if (progress < 100) return 'medium';
                                    if (progress < 110) return 'high';
                                    return 'very-high';
                                };
                                
                                const loadLevel = hasData ? getLoadLevel(progress) : '';
                                
                                return (
                                    <div 
                                        key={day.date.toString()} 
                                        className={`calendar-cell 
                                            ${day.isToday ? 'today' : ''} 
                                            ${day.isCurrentMonth ? '' : 'other-month'}
                                            ${day.isSelected ? 'selected' : ''}
                                            ${loadLevel}
                                        `}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        <div className="day-header">
                                            <span className="day-number">{day.number}</span>
                                        </div>
                                        
                                        {hasData && (
                                            <div className="day-content">
                                                <div className="day-value">{value}м</div>
                                                <div className="day-progress">
                                                    <div 
                                                        className={`progress-fill ${loadLevel}`}
                                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="calendar-sidebar">
                    {selectedDate && selectedDayData ? (
                        <div className="date-details">
                            <h3>Детали за {selectedDate.toLocaleDateString('ru-RU')}</h3>
                            <div className="station-details">
                                {Object.entries(selectedDayData).map(([station, fact]) => {
                                    const norm = norms[station]?.daily || 0;
                                    const progress = norm > 0 ? (fact / norm) * 100 : 0;
                                    
                                    return (
                                        <div key={station} className="station-progress">
                                            <div className="station-header">
                                                <span className="station-name">{station}</span>
                                                <span className="station-values">
                                                    {fact.toFixed(1)}м / {norm}м
                                                </span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className={`progress-fill-detail ${
                                                        progress < 90 ? 'low' : 
                                                        progress < 100 ? 'medium' : 
                                                        progress < 110 ? 'high' : 'very-high'
                                                    }`}
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <h3>Выберите дату</h3>
                            <p>Нажмите на любой день в календаре, чтобы увидеть детальную информацию</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarNew;