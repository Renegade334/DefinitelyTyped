import { MatchMetadata, OnfleetMetadata } from "../onfleet";

export type RecipientQueryKey = "phone" | "name";

export interface OnfleetRecipient {
    id: string;
    metadata: OnfleetMetadata[];
    name: string;
    notes: string;
    organization: string;
    phone: string;
    skipSMSNotifications: boolean;
    timeCreated: number;
    timeLastModified: number;
}

export interface CreateRecipientProps {
    name: string;
    phone: string;
    metadata?: OnfleetMetadata[] | undefined;
    notes?: string | undefined;
    skipSMSNotifications?: boolean | undefined;
    skipPhoneNumberValidation?: boolean | undefined;
}

declare class Recipients {
    create(recipient: CreateRecipientProps): Promise<OnfleetRecipient>;
    get(queryOrId: string, queryKey?: RecipientQueryKey): Promise<OnfleetRecipient>;
    matchMetadata: MatchMetadata<OnfleetRecipient["metadata"]>;
    update(id: string, recipient: Partial<CreateRecipientProps>): Promise<OnfleetRecipient>;
}

export default Recipients;
