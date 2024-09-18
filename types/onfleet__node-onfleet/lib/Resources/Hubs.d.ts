import { DestinationAddress, Location, OnfleetDestination } from "./Destinations";

export interface OnfleetHub {
    address: OnfleetDestination["address"];
    id: string;
    location: Location;
    name: string;
    teams: string[];
}

export interface CreateHubProps {
    /** The hub’s street address information. */
    address: DestinationAddress;
    /** A name to identify the Hub. */
    name: string;
    /** This is the team ID(s) that this Hub will be assigned to. */
    team?: string[];
}

declare class Hubs {
    create(obj: CreateHubProps): Promise<OnfleetHub>;
    get(): Promise<OnfleetHub[]>;
    update(id: string, hub: Partial<OnfleetHub>): Promise<OnfleetHub>;
}

export default Hubs;
