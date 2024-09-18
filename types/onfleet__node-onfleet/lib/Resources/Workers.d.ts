import { MatchMetadata, OnfleetMetadata } from "../onfleet";
import { Location } from "./Destinations";

export interface OnfleetWorker {
    id: string;
    timeCreated: number;
    timeLastModified: number;
    organization: string;
    name: string;
    displayName: string;
    phone: string;
    activeTask: string | null;
    tasks: string[];
    onDuty: boolean;
    timeLastSeen: number;
    capacity: number;
    userData: {
        appVersion: string;
        batteryLevel: number;
        deviceDescription: string;
        platform: string;
    };
    accountStatus: string;
    metadata: OnfleetMetadata[];
    imageUrl: string | null;
    teams: string[];
    delayTime: number | null;
    location: Location;
    vehicle: Vehicle | null;
}

export interface Vehicle {
    type: "BICYCLE" | "CAR" | "MOTORCYCLE" | "TRUCK";
    color?: string | undefined;
    description?: string | undefined;
    licensePlate?: string | undefined;
}

export interface GetWorkerQueryProps {
    /** A comma-separated list of fields to return, if all are not desired. For example, name, location */
    filter?: string | undefined;
    /** A comma-separated list of workers' phone numbers. */
    phones?: string | undefined;
    /**
     * A comma-separated list of worker states, where 0 is off-duty,
     * 1 is idle (on-duty, no active task) and 2 is active (on-duty, active task).
     */
    states?: string | undefined;
    /** A comma-separated list of the team IDs that workers must be part of. */
    teams?: string | undefined;
}

export interface GetWorkerByLocationProps extends Location {
    radius?: number | undefined;
}

export interface CreateWorkerProps {
    /** The worker’s complete name. */
    name: string;
    /** A valid phone number as per the worker’s organization’s country. */
    phone: string;
    /** One or more team IDs of which the worker is a member. */
    teams: string | string[];
    /** The worker’s vehicle; providing no vehicle details is equivalent to the worker being on foot. */
    vehicle?: Vehicle | undefined;
    /** The maximum number of units this worker can carry, for route optimization purposes. */
    capacity?: number | undefined;
    /**
     * This value is used in place of the worker's actual name within sms notifications,
     * delivery tracking pages, and across organization boundaries (connections).
     */
    displayName?: string | undefined;
}

export interface UpdateWorkerProps {
    capacity?: number | undefined;
    displayName?: string | undefined;
    metadata?: OnfleetMetadata | undefined;
    name?: string | undefined;
    teams?: string | string[] | undefined;
    vehicle?: Vehicle | undefined;
}

export interface WorkerSchedule {
    date: string;
    timezone: string;
    shifts: [[number, number]];
}

declare class Workers {
    create(worker: CreateWorkerProps): Promise<OnfleetWorker>;
    deleteOne(id: string): Promise<void>;
    get(): Promise<OnfleetWorker[]>;
    get(id: string, query?: GetWorkerQueryProps): Promise<OnfleetWorker>;
    getByLocation(location: GetWorkerByLocationProps): Promise<{ workers: OnfleetWorker[] }>;
    getSchedule(id: string): Promise<{ entries: WorkerSchedule[] }>;
    insertTask(id: string, obj: { tasks: string[] }): Promise<OnfleetWorker>;
    matchMetadata: MatchMetadata<OnfleetWorker["metadata"]>;
    setSchedule(id: string, schedule: WorkerSchedule): Promise<{ entries: WorkerSchedule[] }>;
    update(id: string, worker: UpdateWorkerProps): Promise<OnfleetWorker>;
}

export default Workers;
