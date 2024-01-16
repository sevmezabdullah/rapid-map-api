export class Load {
    constructor(
        public readonly _id?: number,
        public readonly loadNumber?: string,
        public readonly loadType?: string,
        public readonly weight?: number,
        public readonly customerId?: string,
        public readonly loadAddress?: string,
        public readonly unloadAddress?: string,


    ) {

    }
}