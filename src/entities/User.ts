export class User {
    constructor(
        public readonly _id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly phone: string
    ) {

    }
}