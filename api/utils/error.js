export const errorHandler= (statusCode, message)=>{
    const error= new Error(); 
    error.statusCode= statusCode
    error.message= message; 
    return error; 
}

// Add this line to export the same function with a different name
export const createError = errorHandler;
