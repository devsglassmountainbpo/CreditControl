import { currentYear, months } from "./constants";

export const formatDateHelper = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
  


export const getMonthNumber = (monthName: string): string => {
    const monthIndex = months.indexOf(monthName) + 1;
    return monthIndex.toString().padStart(2, '0');
};

export const generateQuarterCode = (quarter: string, quarterMonth: string): string => {
    const yearSuffix = currentYear.toString().slice(-2);
    const monthNumber = getMonthNumber(quarterMonth);
    return `${quarter}${monthNumber}${yearSuffix}`;
};