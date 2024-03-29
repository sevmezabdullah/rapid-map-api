

export class Truck {
    constructor(
        public readonly plate?: string,
        public readonly type?: string,
        public readonly _id?: number,
        public readonly status?: string,
        public readonly loadNumber?: string,
        public driverId?: string,
        public readonly currentPosition?: { langitute: number, latitude: number },
        public readonly category?: string,
    ) { }
}