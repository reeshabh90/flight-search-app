export interface BookingDetails {
    source: string;
    destination: string;
    departDate: Date;
    returnDate?: Date;
    passengers: number;
    oneway: boolean;
    refine?: number;
}
