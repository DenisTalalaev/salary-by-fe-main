import axios from "axios";

const registerUser = async (credentials) => {
    const response = await axios.post('auth/register', {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
    })
    return {
        message: response.data.message
    }
}

export default registerUser;