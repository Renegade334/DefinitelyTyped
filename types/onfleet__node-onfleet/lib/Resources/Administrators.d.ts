import { MatchMetadata, OnfleetMetadata } from "../onfleet";

export interface OnfleetAdmin {
    email: string;
    id: string;
    isActive: boolean;
    metadata: OnfleetMetadata;
    name: string;
    organization: string;
    phone: string;
    timeCreated: number;
    timeLastModified: number;
    type: "super" | "standard";
}

export interface CreateAdminProps {
    /** The administrator’s email address. */
    email: string;
    /** The administrator’s complete name. */
    name: string;
    /** The administrator's phone number. */
    phone?: string | undefined;
    /** Whether this administrator can perform write operations. */
    isReadOnly?: boolean | undefined;
}

export interface UpdateAdminProps {
    email?: string | undefined;
    metadata?: OnfleetMetadata | undefined;
    name?: string | undefined;
}

declare class Administrators {
    create(obj: CreateAdminProps): Promise<OnfleetAdmin>;
    deleteOne(id: string): Promise<void>;
    get(): Promise<OnfleetAdmin[]>;
    matchMetadata: MatchMetadata<OnfleetAdmin["metadata"]>;
    update(id: string, obj: UpdateAdminProps): Promise<OnfleetAdmin>;
}

export default Administrators;
