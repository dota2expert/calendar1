import { type FC } from "react";
import "../../../styles/Calendar.scss";
import CalendarUI from "react-calendar";
import { format } from 'date-fns';
import type { DayData, Norms } from "../../../../types/calendar";
import { ProgressBar } from "./ProgressBar";
import type { TCalendarValue } from "../../../../types/types";

type TProps = {
  norms: Norms;
  weekData: DayData[];
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  locale?: string;
};

const CalendarComponent: FC<TProps> = ({
  norms,
  weekData,
  value,
  onChange,
  locale,
}) => {
  const handleChange = (selectedValue: TCalendarValue) => {
  if (selectedValue instanceof Date) {
    onChange?.(selectedValue);
  } else if (Array.isArray(selectedValue)) {
    onChange?.(selectedValue[0]);
  } else {
    onChange?.(null);
  }
};

  const dayData = value ? weekData.find((d) => d.date === format(value, 'yyyy-MM-dd')) : null;

  return (
    <div className="calendar-with-info">
      <CalendarUI
        onChange={handleChange}
        value={value}
        locale={locale}
      />

      {dayData ? (
        <div className="date-info">
          <h3>Дата: {dayData.date}</h3>
          {Object.keys(norms).map((key) => (
            <ProgressBar
              key={key}
              label={key}
              fact={dayData.facts[key] || 0}
              norm={norms[key].daily}
            />
          ))}
        </div>
      ) : (
        <div className="no-data">Данных за этот день нет!</div>
      )}
    </div>
  );
};

export const Calendar = CalendarComponent;