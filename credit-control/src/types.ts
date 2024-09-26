export interface InventoryItem {
    asset: string;
    brand: string;
    category: string;
    createdBy: string;
    dateTime: string;
    dateUpdated: string;
    details: string;
    id: number;
    idTickets: string;
    model: string;
    quantity: number;
    receivedBy: string | null;
    status: string;
    totalPrice: string;
    vendor: string;
    batchID: number | null;
  }

export interface AssetItem {
    active: number;
    date_created: string;
    id: number;
    name: string;
}

export interface BrandItem {
    name: string;
}

export interface ModelItem {
    name: string;
}

export interface CategoryItem {
    active: number;
    date_created: string;
    id: number;
    name: string;
}


export type CreditRecord = {
    id: number;
    name_: string;
    badge: string;
    reference_number: string;
    credit_total: string;
    total_payment: number;
    credit_start_date: string;
    credit_end_date: string;
    id_bank: number;
    date_created: string;
    status_credit: string;
    photo?: string;
    name_bank?: string;
    due?: string;
    quarter?: string;
    active: number;
};

export type PayrollRecord = 
Omit<CreditRecord, 
'name_bank' | 
'reference_number' | 
'credit_total' | 
'total_payment' | 
'credit_start_date' | 
'credit_end_date' | 
'date_created' | 
'status_credit'> 

export type PaymentsRecord = 
Omit<CreditRecord,
'name_' |
'due' |
'credit_total' | 
'total_payment' | 
'credit_start_date' | 
'date_created' | 
'status_credit'>

export type ReportType = 'payroll' | 'payments';