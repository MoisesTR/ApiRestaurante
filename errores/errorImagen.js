class ImagenError extends Error { 

    constructor(message, status) {
        super(message);

        this.name = 'ImageError';
        this.status = status || 500;
    }

    toJson() {
        return {
            name: this.name
            , status: this.status
            , message: this.message
        }
    }
}

module.exports = ImagenError;