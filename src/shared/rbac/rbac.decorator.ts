import { RbacTaskProperty, RbacPermissionTask, BASE_ROLE, RbacTask } from './rbac.types';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TASK_LIST } from './rbac.defaults';
import { RbacGuard } from './rbac.guard';

export type RbacPermissionOption = BASE_ROLE | {
    role: BASE_ROLE,
    tasks: RbacTaskProperty[],
};
export type RbacDecoratorOptions = {
    action: string,
    permissions?: RbacPermissionOption | RbacPermissionOption[],
    tasks?: RbacTask[],
    roles?: BASE_ROLE[]
}
export type PermissionMap = {
    [name: string]: {
        [role: string]: RbacTaskProperty[]
    }
};
const PERMISSION_MAP: PermissionMap = {};

export const RbacMetaToken = "RBAC_METADATA";
export function getPermissionMap() {
    return PERMISSION_MAP;
}
export function addPermissionMap(action: string, permissions: RbacPermissionOption | RbacPermissionOption[]) {
    if (!PERMISSION_MAP[action])
        PERMISSION_MAP[action] = {};
    if (permissions instanceof Array)
        for (const perm of permissions) {
            addPermissionMap(action, perm);
            // if (typeof perm === "string")
            //     PERMISSION_MAP[action][perm] = TASK_LIST;
            // else {
            //     let role = typeof perm === "string" ? perm : perm.role;
            //     let newTasks = perm.tasks;
            //     const tasks = PERMISSION_MAP[action][role];
            //     PERMISSION_MAP[action][role] = newTasks ? (tasks || []).concat(newTasks).filter((v, i, l) => l.indexOf(v) === i) : TASK_LIST;
            // }
        }
    else if (typeof permissions === "string") {
        let role = permissions;
        PERMISSION_MAP[action][role] = TASK_LIST;
    }
    else {
        if (!permissions)
            return;
        let role = permissions.role;
        let newTasks = permissions.tasks;
        const tasks = PERMISSION_MAP[action][role];
        PERMISSION_MAP[action][role] = newTasks ? (tasks || []).concat(newTasks).filter((v, i, l) => l.indexOf(v) === i) : TASK_LIST;
    }
}

export const Rbac = (data: RbacDecoratorOptions) => {
    const { action, permissions, tasks, roles } = data;
    if (permissions)
        addPermissionMap(action, permissions);
    if (roles) {
        for (const role of roles)
            addPermissionMap(action, {
                role,
                tasks: tasks || TASK_LIST
            });
    }
    if (tasks)
        return applyDecorators(
            SetMetadata(RbacMetaToken, data),
            UseGuards(RbacGuard))
    return SetMetadata(RbacMetaToken, data);
};