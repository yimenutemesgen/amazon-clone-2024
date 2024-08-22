


import axios from "axios"

const axiosInstance =axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-efb1b/us-central1/api"


    // deployed version of amazon server on render.com
    baseURL: "https://amazon-api-deployment-fh2r.onrender.com"
})


export {axiosInstance};