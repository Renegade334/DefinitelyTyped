import { MatchMetadata, OnfleetMetadata } from "../onfleet";

export type Latitude = number;
export type Longitude = number;
export type Location = [Longitude, Latitude];

export interface DestinationAddress {
    /** The suite or apartment number, or any additional relevant information. */
    apartment?: string | undefined;
    /** The name of the municipality. */
    city: string;
    /** The name of the country. */
    country: string;
    /** A name associated with this address, for example, "Transamerica Pyramid". */
    name?: string | undefined;
    /** The number component of this address, it may also contain letters. */
    number: string;
    /** The postal or zip code. */
    postalCode?: string | undefined;
    /** The name of the state, province or jurisdiction. */
    state?: string | undefined;
    /** The name of the street. */
    street: string;
    /**
     * A complete address specified in a single, unparsed string where the various elements are separated by commas.
     *
     * If present, all other address properties will be ignored (with the exception of `name` and `apartment`).
     *
     * In some countries, you may skip most address details (like `city` or `state`) if you provide a valid `postalCode`:
     * for example, `325 Front Street W., M5V 3B5, CA` will be geocoded correctly.
     */
    unparsed?: string | undefined;
}

export interface OnfleetDestination {
    id: string;
    timeCreated: number;
    timeLastModified: number;
    location: Location;
    address: {
        apartment: string;
        state: string;
        postalCode: string;
        country: string;
        city: string;
        street: string;
        number: string;
    };
    notes: string;
    metadata: OnfleetMetadata[];
}

export interface CreateDestinationProps {
    address: DestinationAddress;
    location?: Location | undefined;
    notes?: string | undefined;
}

declare class Destinations {
    create(destination: CreateDestinationProps): Promise<OnfleetDestination>;
    get(id: string): Promise<OnfleetDestination>;
    matchMetadata: MatchMetadata<OnfleetDestination["metadata"]>;
}

export default Destinations;
