interface FlightTime {
    departure: string;
    arrival: string;
}

export interface Flight {
    flightNo: string;
    source: string;
    destination: string;
    time: FlightTime;
    date: Date;
    fare: number;
}

