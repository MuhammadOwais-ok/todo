 const signUpmiddleware = (request , response,next)=>{
 
 
 
 try{
        const data = request.body


        if (!data) {
            return response.status(400).json({
                messasge: "payload is required"
            })

        }
        const { firstName, lastName, email, password } = data

        if (!firstName 
            
        ) {
            return response.status(400).json({
                message: "firstName are required"
            })
        }
        if (!lastName) {
            return response.status(400).json({
                message: "lastName is required"
            })
            
        }
        if (!email) {
            return response.status(400).json({
                message:"email is required"
            })
            
        }
        if (!password) {
            return response.status(400).json({
                message:"password is required"
            })
            
        }
        next()
    }



    catch(error){
        return response.status(500).json({
            error:error.message || "internal server error"
        })
    }
}