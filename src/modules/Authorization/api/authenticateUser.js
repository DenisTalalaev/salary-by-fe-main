import axios from "axios";

const authenticateUser = async (credentials) => {
    const response = await axios.post('auth/token', {
        username: credentials.username,
        password: credentials.password,
    })
    return {
        token: response.data.token
    }
}

export default authenticateUser;