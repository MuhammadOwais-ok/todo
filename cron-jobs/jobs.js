const cron = require('node-cron');
const OTP = require('../models/otps');



const logEverySecond = () => {

    cron.schedule('*/10 * * * * *', async () => {
        const otps = await OTP.find()
        for (let i = 0; i < otps.length; i++) {
            const otp = otps[i];

            if (new Date() > otp.expiresAt) {
                console.log(`${otp.otpCode} has been expired.`)

                await OTP.deleteOne({ _id: otp._id })
            }

            console.log("NOTHING TO DELETE");
        }
    });

}






module.exports = {
    logEverySecond
}