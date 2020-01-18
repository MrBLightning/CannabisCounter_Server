

export type AuthPayload = {
    id: string;
    phone: string;
    session_id: string;
}

export type AuthUser = {
    id: number;
    phone: string;
    name: string;
    netw: string;
    role: string;
    branches: number[];
    email?: string;
}