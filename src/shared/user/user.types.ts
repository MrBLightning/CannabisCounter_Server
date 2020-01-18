export type User = {
    id: number;
    phone: string;
    password?: string;
    role: string;
    netw: string;
    name: string;
    branch?: string;
    email?: string;
    created_by: number;
    updated_at: string;
    created_at: string;
    branches?: number[];
}