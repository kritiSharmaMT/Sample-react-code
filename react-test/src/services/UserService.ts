import CommonService from "./CommonService";
import { LoginType } from '../interfaces'

/**
 * Login the User
 * 
 * @param data object
 */
const login = async (data: LoginType) => {
    return CommonService.post('/auth/login', data);
}

/**
 * View the User
 * 
 * @param data object
 */
const me = async (id: string) => {
    return CommonService.get('/user/view/' + id);
}

/**
 * View the User
 * 
 * @param data object
 */
const update = async (id: string, data: any) => {
    return CommonService.put('/user/update/' + id, data);
}

export default {
    login,
    me,
    update
}