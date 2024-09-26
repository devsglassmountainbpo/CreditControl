import { useState } from 'react'
import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
import { Button, Card, Label, Select } from 'flowbite-react';
import { HiDocumentDownload } from 'react-icons/hi';
import useCreditData from '../../hooks/useCreditData';
import { CreditRecord, ReportType } from '../../types';
import { currentMonth, months } from '../../utils/constants';
import { formatDateHelper, generateQuarterCode, } from '../../utils/helpers';
import * as XLSX from 'xlsx';


const BankReports = () => {
  const { filteredData, isLoading } = useCreditData();
  const [quarter, setQuarter] = useState('Q1-');
  const [quarterMonth, setQuarterMonth] = useState(currentMonth);
  const [reportType, setReportType] = useState<ReportType>('payroll');

  const handleGenerateReport = (format: string) => {

    const quarterCode = generateQuarterCode(quarter, quarterMonth);
    if (format === 'Quarter') {
      generateQuarterReport(filteredData, quarterCode);
      return;
    }
    generateAllReports(filteredData, reportType);
  };


  const generateAllReports = (data: CreditRecord[], reportType: ReportType) => {
    const reportMappings: Record<ReportType, (item: CreditRecord) => Record<string, any>> = {
      payroll: (item) => ({
        ID: item.id,
        Name: item.name_,
        Badge: item.badge,
        Due: item.due,
        Active: item.active,
        TotalPayments: item.total_payment,
        credit_start_date: formatDateHelper(item.credit_start_date),
        credit_end_date: formatDateHelper(item.credit_end_date),
        DateCreated: formatDateHelper(item.date_created),
        Status: item.status_credit,
        Quarter: item.quarter,
      }),
      payments: (item) => ({
        ID: item.id,
        Badge: item.badge,
        Bank: item.name_bank,
        Active: item.active,
        TotalPayments: item.total_payment,
        credit_start_date: formatDateHelper(item.credit_start_date),
        credit_end_date: formatDateHelper(item.credit_end_date),
        DateCreated: formatDateHelper(item.date_created),
        Status: item.status_credit,
        Quarter: item.quarter,
      }),
    };

    const mapFunction = reportMappings[reportType];
    const orderedData = data.map(mapFunction);

    const ws = XLSX.utils.json_to_sheet(orderedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'BankReports.xlsx');
  };

  const generateQuarterReport = (data: CreditRecord[], quarter: String) => {
    const quarterData = data.filter(item => item.quarter === quarter);
    const reportMappings: Record<ReportType, (item: CreditRecord) => Record<string, any>> = {
      payroll: (item) => ({
        ID: item.id,
        Name: item.name_,
        Badge: item.badge,
        Due: item.due,
        Active: item.active,
        Quarter: item.quarter,
      }),
      payments: (item) => ({
        ID: item.id,
        Badge: item.badge,
        Bank: item.name_bank,
        Active: item.active,
        Quarter: item.quarter,
      }),
    };

    const mapFunction = reportMappings[reportType];
    const orderedData = quarterData.map(mapFunction);

    // Crea el excel
    const ws = XLSX.utils.json_to_sheet(orderedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'BankReports.xlsx');
  };


  return (
    <NavbarSidebarLayout2 isFooter={true}>
      <div className="justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <Card>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
            Bank Reports Generator
          </h5>
          <div className="flex gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 w-1/6 sm:pr-4">
              <Label htmlFor="report-type" value="Report Type" />
              <Select
                id="report-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value as ReportType)}
                required
              >
                <option value="" disabled>Select report type</option>
                <option value="payroll">Payrolls</option>
                <option value="payments">Payments</option>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-1/6 sm:pr-4">
              <Label htmlFor="quarter" value="Select Quarter" />
              <Select
                id="quarter"
                defaultValue={'Q1-'}
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                required
              >
                <option value="" disabled>Select quarter</option>
                <option value="Q1-">Q1</option>
                <option value="Q2-">Q2</option>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-1/6 sm:pr-4">
              <Label htmlFor="quarter" value="Select Month" />
              <Select
                id="current-month"
                defaultValue={currentMonth}
                value={quarterMonth}
                onChange={(e) => setQuarterMonth(e.target.value)}
                required
              >
                <option value="" disabled>Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </Select>
            </div>

          </div>
          <div className="flex flex-row gap-6 justify-start" style={{ zoom: 0.90 }}>
            <div className="mt-4">
              <Button onClick={() => handleGenerateReport('All')} disabled={isLoading} color="primary">
                <HiDocumentDownload className="mr-2 h-5 w-5" />
                Generate All Time Report
              </Button>
            </div>
            <div className="mt-4">
              <Button onClick={() => handleGenerateReport('Quarter')} disabled={isLoading} color="primary">
                <HiDocumentDownload className="mr-2 h-5 w-5" />
                Generate Quarter Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </NavbarSidebarLayout2>
  )
}

export default BankReports