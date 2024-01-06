export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Kayıt Bulunamadı';
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Yetkisiz Erişim';
    }
}