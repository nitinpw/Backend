class ApiResponse {
    constructor(statusCode, data, message = "success"){
        this.statusCose = statusCode
        this.data = data
        this.message = message
        this.success= statusCode < 400
    }
}

export {ApiResponse}