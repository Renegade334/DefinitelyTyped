export interface OnfleetContainer {
    id: string;
    timeCreated: number;
    timeLastModified: number;
    organization: string;
    type: "ORGANIZATION" | "TEAM" | "WORKER";
    activeTask: string | null;
    tasks: string[];
    worker: string;
}

declare class Containers {
    get(id: string, group: "organizations" | "teams" | "workers"): Promise<OnfleetContainer>;
}

export default Containers;
