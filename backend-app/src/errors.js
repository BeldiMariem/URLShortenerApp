class InvalidUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUrlError";
    }
}

class UrlNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UrlNotFoundError";
    }
}

module.exports = { InvalidUrlError, UrlNotFoundError };
