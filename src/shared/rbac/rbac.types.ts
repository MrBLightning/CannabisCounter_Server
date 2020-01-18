
export enum BASE_ROLE {
    SUPER = "super_admin",
    USER = "user",
    MANAGER = "manager"
}

export type RbacAction = number;
export type RbacRole = {
    role: string;
    netw?: string,
    name?: string;
    permission: RbacPermission[];
};
export type RbacTask = "read" | "create" | "delete" | "edit";
export type RbacTaskProperty = RbacTask;
export type RbacPermissionTask = {
    read: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}
export type RbacPermission = {
    action: string;
} & RbacPermissionTask;



export type RoleRecord = {
    netw: string;
    role: string;
    name?: string;
    created_by?: number;
    created_at: string;
    updated_at: string;
};
export type PermissionRecord = {
    role: string;
    action: string;
    netw: string;
    read: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    created_by?: number;
    created_at: string;
    updated_at: string;
};
export type ActionRecord = {
    action: string;
    name?: string;
    created_at: string;
    updated_at: string;
};
