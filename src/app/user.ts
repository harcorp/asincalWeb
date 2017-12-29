export interface Roles {
    afiliado?: boolean;
    admin?: boolean;
    superAdmin?: boolean;
}
export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    mobile?: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    active?: boolean;
    place?: number;
    docType?: number;
    docNumber?: number;
    observations?: string;
    city?: string;
    roles: Roles;
}
