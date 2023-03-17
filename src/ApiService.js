import axios from "axios"

const URL = "http://localhost:4000/users"
const getAllUser = async () => {
    const result = await axios.get(`${URL}`)
    return result.data
}

export {getAllUser}


