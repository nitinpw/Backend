import { asyncHandler } from "../utils/asynchandler";

const registerUSer = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

export {registerUSer}