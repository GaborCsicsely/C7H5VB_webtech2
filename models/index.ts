export interface ComputerDTO {
    id: number;
    computerId: string;
    name: string;
    madeBy: string;
    type: string;
    specs: string;
    weight: string;
    price: string;
    isAvailable: number;
}
export interface CompanyDTO {
    id: number;
    companyName: string;
    representativesName: string;
    taxNumber: string;
    registrationNumber: string;
    address: string;
    balance: number;
    password: string;
}
export interface TransactionsDTO {
    id: number;
    companyId: string;
    computerId: string;
    type: string;
    time: Date;
    balanceChange: string;
    completed: string;
}