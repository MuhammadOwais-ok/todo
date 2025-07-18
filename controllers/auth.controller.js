
const login = (reuqest, responce) => {
    return responce.json({ message: "login successfully" })
}


const signUp = (requst, responce) => {
    return responce.json({
        messsage: "signUp Successfully"
    })

}



module.exports = {
    login,
    signUp
}
