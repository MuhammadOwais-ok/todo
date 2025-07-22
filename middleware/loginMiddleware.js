
const loginMiddleware = (request,response,next)=>{



try {
        const data = request.body
        if (!data) {
            return response.status(400).json({
                message: "payload is Required"
            })

        }

        const { email, password } = data

        if (!email ||
            !password) {

            return response.status(401).json({
                message: "Email and Password is Required"
            })
        }
        next()
    }
    catch (error){
        return response.status(500).json({
            error:error.message || "internal server error"
        })
    }
    
}