import Administrators from "./Resources/Administrators";
import Containers from "./Resources/Containers";
import Destinations from "./Resources/Destinations";
import Hubs from "./Resources/Hubs";
import Organization from "./Resources/Organization";
import Recipients from "./Resources/Recipients";
import Tasks from "./Resources/Tasks";
import Teams from "./Resources/Teams";
import Webhooks from "./Resources/Webhooks";
import Workers from "./Resources/Workers";

export type MetadataVisibility = "api" | "dashboard" | "worker";
export type MetadataType = "boolean" | "number" | "string" | "object" | "array";
export type MetadataSubType = "boolean" | "number" | "string" | "object";

export interface OnfleetMetadata {
    name: string;
    type: MetadataType;
    subtype?: MetadataSubType | undefined;
    visibility?: MetadataVisibility[] | undefined;
    value: any;
}

export interface MatchMetadataResult {
    id: string;
    metadata: OnfleetMetadata[];
}

export type MatchMetadata<T> = (obj: T) => Promise<MatchMetadataResult[]>;

export interface BottleneckOptions {
    /** @default 20 */
    LIMITER_RESERVOIR?: number;
    /** @default 10000 */
    LIMITER_WAIT_UPON_DEPLETION?: number;
    /** @default 1 */
    LIMITER_MAX_CONCURRENT?: number;
    /** @default 50 */
    LIMITER_MIN_TIME?: number;
}

declare class Onfleet {
    apiKey: string;
    api: {
        baseUrl: string;
        timeout: number;
        headers: {
            "Content-Type": string;
            "User-Agent": string;
            Authorization: string;
        };
    };

    constructor(
        api_key: string,
        timeout?: number,
        bottleneckOptions?: BottleneckOptions,
        baseURL?: string,
        defaultPath?: string,
        defaultApiVersion?: string,
    );
    verifyKey(): Promise<boolean>;

    administrators: Administrators;
    admins: Administrators;
    containers: Containers;
    destinations: Destinations;
    hubs: Hubs;
    organization: Organization;
    recipients: Recipients;
    tasks: Tasks;
    teams: Teams;
    webhooks: Webhooks;
    workers: Workers;
}

export default Onfleet;
