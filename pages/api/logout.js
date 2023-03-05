const handler = async(req, res) => {

    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    res.status(200).json({
        message: "Successfully Logout",
        clear : "Session Cleared"
    })
}

export default handler