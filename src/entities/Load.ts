export class Load {
    constructor(
        public readonly _id: number,
        public readonly name: string,
        public readonly weight: number,
        public readonly type: string,
        public readonly status: string,
        public readonly pickupAdress: string,
        public readonly deliveryAdress: string,
        public readonly currentPosition: { langitute: number, latitude: number },
        public readonly truckId: string | null,

    ) {

    }
}