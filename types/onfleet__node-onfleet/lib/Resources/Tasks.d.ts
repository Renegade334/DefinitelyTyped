import { MatchMetadata, OnfleetMetadata } from "../onfleet";
import { CreateDestinationProps, Location, OnfleetDestination } from "./Destinations";
import { CreateRecipientProps, OnfleetRecipient } from "./Recipients";

export type TaskQueryKey = "shortId";

export enum TaskState {
    Unassigned,
    Assigned,
    Active,
    Completed,
}

export interface CompletionEvent {
    name: string;
    time: number;
    location?: Location;
}

export interface TaskCompletionDetails {
    failureNotes?: string;
    failureReason?: string;
    events: CompletionEvent[];
    actions?: any[];
    time: number | null;
    firstLocation?: any[];
    lastLocation?: any[];
    unavailableAttachments?: any[];
    notes?: string;
    success?: boolean;
    photoUploadId?: string | null;
    photoUploadIds?: string[];
    signatureUploadId?: string | null;
}

type TaskCustomFieldValue = boolean | number | string | string[];

interface TaskCustomField {
    description: string;
    asArray: boolean;
    visibility: string[];
    editability: string[];
    key: string;
    name: string;
    type: "single_line_text_field" | "multi_line_text_field" | "boolean" | "integer" | "decimal" | "date" | "Url";
    contexts: any[];
    value: TaskCustomFieldValue;
}

interface OnfleetTask {
    completeAfter: number;
    completeBefore: number;
    completionDetails: TaskCompletionDetails;
    container: TaskContainer;
    creator: string;
    dependencies: string[];
    destination: OnfleetDestination;
    didAutoAssign: boolean;
    executor: string;
    feedback: any[];
    id: string;
    identity: {
        failedScanCount: number;
        checksum: null;
    };
    merchant: string;
    metadata: OnfleetMetadata[];
    notes: string;
    organization: string;
    overrides: {
        recipientName: string | null;
        recipientNotes: string | null;
        recipientSkipSMSNotifications: string | null;
        useMerchantForProxy: string | null;
    };
    pickupTask: boolean;
    quantity: number;
    recipients: OnfleetRecipient[];
    serviceTime: number;
    shortId: string;
    state: TaskState;
    timeCreated: number;
    timeLastModified: number;
    trackingURL: string;
    trackingViewed: boolean;
    worker: string | null;
    barcodes?:
        | {
            /** The requested barcodes */
            required: Barcode[];
            /** Once a task is completed for which barcodes have been captured, the capture details can be found here */
            captured: CapturedBarcode[];
        }
        | undefined;
    customFields?: TaskCustomField[] | undefined;
}

export interface CreateMultipleTasksProps {
    tasks: CreateTaskProps[];
}

export interface CreateMultipleTasksResult {
    tasks: OnfleetTask[];
}

export interface CreateAsyncMultipleTaskResult {
    status: string;
    jobId: string;
}

export interface CreateTaskProps {
    destination: string | CreateDestinationProps;
    recipients: string[] | CreateRecipientProps[];
    autoAssign?: TaskAutoAssign | undefined;
    capacity?: number | undefined;
    container?: TaskContainer | undefined;
    completeAfter?: number | undefined;
    completeBefore?: number | undefined;
    dependencies?: string[] | undefined;
    executor?: string | undefined;
    metadata?: OnfleetMetadata[] | undefined;
    merchant?: string | undefined;
    notes?: string | undefined;
    pickupTask?: boolean | undefined;
    quantity?: number | undefined;
    recipientName?: string | undefined;
    recipientNotes?: string | undefined;
    recipientSkipSMSNotifications?: boolean | undefined;
    requirements?: TaskCompletionRequirements | undefined;
    barcodes?: Barcode[] | undefined;
    serviceTime?: number | undefined;
    customFields?: Array<{ key: string; value: TaskCustomFieldValue }> | undefined;
}

export interface AutomaticallyAssignTaskProps {
    tasks: string[];
    options?: TasksAutoAssign | undefined;
}

export interface AutomaticallyAssignTaskResult {
    assignedTasksCount: number;
    assignedTasks: {
        [taskId: string]: string;
    };
}

export interface TaskAutoAssignOptions {
    mode: string;
    considerDependencies?: boolean | undefined;
    excludedWorkerIds?: string[] | undefined;
    maxAssignedTaskCount?: number | undefined;
    team?: string | undefined;
    teams?: string[] | undefined;
    restrictAutoAssignmentToTeam?: boolean | undefined;
}

export type TasksAutoAssign = Omit<TaskAutoAssignOptions, "team">;

export type TaskAutoAssign = Omit<TaskAutoAssignOptions, "teams" | "restrictAutoAssignmentToTeam">;

export interface Barcode {
    /** Whether the worker must capture this data prior to task completion, defaults to false */
    blockCompletion?: boolean | undefined;
    /** Base64 representation of the data encoded within the barcode to be captured, max length of 500 characters */
    data?: string | undefined;
}

export interface CapturedBarcode {
    /** The ID of the captured barcode */
    id: string;
    /** The symbology that was captured */
    symbology: string;
    /** The base64 string of the data contained in the captured barcode */
    data: Barcode["data"];
    /** The [ lon, lat ] coordinates where the barcode capture took place */
    location: [number, number];
    /** The time at which the barcode capture happened */
    time: number;
    /** Whether the barcode was captured as a result of a barcode request */
    wasRequested: boolean;
}

export interface TaskCompletionRequirements {
    minimumAge?: number | undefined;
    notes?: boolean | undefined;
    photo?: boolean | undefined;
    signature?: boolean | undefined;
}

export interface TaskQueryParam {
    from: number;
    completeAfterAfter?: number | undefined;
    completeBeforeBefore?: number | undefined;
    dependencies?: string | undefined;
    lastId?: string | undefined;
    state?: number | string | undefined;
    to?: number | undefined;
    worker?: string | undefined;
}

export interface CloneTaskOptions {
    includeBarCodes: boolean;
    includeDependencies: boolean;
    includeMetadata: boolean;
    overrides?:
        | {
            completeAfter?: number | undefined;
            completeBefore?: number | undefined;
            destination?: string | CreateDestinationProps | undefined;
            metadata?: OnfleetMetadata[] | undefined;
            notes?: string | undefined;
            pickupTask?: boolean | undefined;
            recipients?: OnfleetRecipient | OnfleetRecipient[] | undefined;
            serviceTime?: number | undefined;
        }
        | undefined;
}

export interface GetTaskResult extends OnfleetTask {
    estimatedCompletionTime: number | null;
    eta: number | null;
    trackingViewed: boolean;
}

export interface GetManyTaskResult {
    lastId?: string;
    tasks: GetTaskResult[];
}

export interface UpdateTaskResult extends OnfleetTask {
    estimatedArrivalTime: number | null;
    estimatedCompletionTime: number | null;
    eta: number;
    trackingViewed: boolean;
}

export interface WorkerTaskContainer {
    type: "WORKER";
    worker: string;
}

export interface OrganizationTaskContainer {
    type: "ORGANIZATION";
    organization: string;
}

export interface GetBatchResult {
    status: string;
    submitted: string;
    tasksReceived: number;
    tasksCreated: number;
    errors: BatchResultErrors[];
    failedTasks: OnfleetTask[];
    succeededWithWarnings: OnfleetTask[];
}

export interface TeamTaskContainer {
    type: "TEAM";
    team: string;
}

export interface BatchResultErrors {
    statusCode: number;
    errorCode: number;
    message: string;
    cause: string;
    taskData: OnfleetTask;
}

export type TaskContainer = WorkerTaskContainer | OrganizationTaskContainer | TeamTaskContainer;

declare class Tasks {
    autoAssign(tasks: AutomaticallyAssignTaskProps): Promise<AutomaticallyAssignTaskResult>;

    batchCreate(tasks: CreateMultipleTasksProps): Promise<CreateMultipleTasksResult>;

    batchCreateAsync(tasks: CreateMultipleTasksProps): Promise<CreateAsyncMultipleTaskResult>;

    getBatch(jobId: string): Promise<GetBatchResult>;

    clone(id: string): Promise<OnfleetTask>;

    create(task: CreateTaskProps): Promise<OnfleetTask>;

    deleteOne(id: string): Promise<number>;

    forceComplete(id: string, details: { completionDetails: { success: boolean; notes?: string } }): Promise<void>;

    get(queryOrId: string, queryKey?: TaskQueryKey): Promise<GetTaskResult>;
    get(queryParams?: TaskQueryParam): Promise<GetManyTaskResult>;

    matchMetadata: MatchMetadata<OnfleetTask["metadata"]>;

    update(id: string, task: Partial<CreateTaskProps>): Promise<UpdateTaskResult>;
}

export default Tasks;
