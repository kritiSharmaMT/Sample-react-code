import axios from "axios"

const URL: string = process.env.REACT_APP_SERVER_URL || '';
const token: string = localStorage.getItem('token') || '';

let headers: object = {}
if (token !== '') {
    headers = {
        'Authorization': 'Bearer ' + token
    }
}

/**
 * GET Request
 * 
 * @param endpoint string
 * @returns Promise
 */
const get = async (endpoint: string): Promise<any> => {
    return await axios.get(URL + endpoint, { headers });
}

/**
 * POST Request
 * 
 * @param endpoint string
 * @param data object
 * @returns Promise
 */
const post = async (endpoint: string, data: any): Promise<any> => {
    return await axios.post(URL + endpoint, data, { headers });
}

/**
 * PUT Request
 * 
 * @param endpoint string
 * @param data object
 * @returns Promise
 */
const put = async (endpoint: string, data: any): Promise<any> => {
    return await axios.put(URL + endpoint, data, { headers });
}

export default {
    get,
    post,
    put
}