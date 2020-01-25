import { RbacPermission } from "../rbac/rbac.types"


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
    permissions: RbacPermission[];
    branches: number[];
    email?: string;
    appOnly: number;
}