import {ErrorClass} from '../types';
import _ from 'lodash';
import {AuthAPIError, BunnyAPIError, NomicsAPIError} from '../utils';
import {collectSysError} from '../store/actions/sys';
import {EBizLogicMsg} from '../constants';
import store from '../store/store';

const {dispatch} = store;
export const checkCommonAPIProtocol = (data: any, PErrorClass: ErrorClass) => {
    let dataKeys;
    try {
        dataKeys = Object.keys(data);
    } catch (err: any) {
        throw new PErrorClass(err.message, err.stack);
    }
    const isDataKeysEqual = _.isEqual(dataKeys.sort(), ['time_spent', 'data', 'http_extra', 'business_logic', 'server_error'].sort());
    if (!isDataKeysEqual) {
        // dispatch(collectSysError(new PErrorClass(EBizLogicMsg.NOT_CONFORM_TO_API_RESPONSE_ROOT_STRUCTURE)));
        return false;
    }
    const {business_logic, http_extra, server_error} = data;
    const blKeys = Object.keys(business_logic);
    const isBLKeysEqual = _.isEqual(blKeys.sort(), ['code', 'message', 'description', 'error_code', 'error_message', 'error_description', 'error_stack'].sort());
    if (!isBLKeysEqual) {
        dispatch(collectSysError(new PErrorClass(EBizLogicMsg.NOT_CONFORM_TO_API_RESPONSE_BL_STRUCTURE)));
        return false;
    }
    const httpExtraKeys = Object.keys(http_extra);
    const isHttpExtraKeysEqual = _.isEqual(httpExtraKeys.sort(), ['code', 'message', 'description'].sort());

    if (!isHttpExtraKeysEqual) {
        dispatch(collectSysError(new PErrorClass(EBizLogicMsg.NOT_CONFORM_TO_API_RESPONSE_EXTRA_STRUCTURE)));
        return false;
    }

    const serverErrorKeys = Object.keys(server_error);
    const isServerErrorKeysEqual = _.isEqual(serverErrorKeys.sort(), ['code', 'message', 'stack'].sort());

    if (!isServerErrorKeysEqual) {
        dispatch(collectSysError(new PErrorClass(EBizLogicMsg.NOT_CONFORM_TO_API_RESPONSE_SERVER_STRUCTURE)));
        return false;
    }
    return true;
};
export const checkAuthAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, AuthAPIError);
};

export const checkBunnyAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, BunnyAPIError);
};

export const checkNomicsAPIProtocol = (data: any) => {
    return checkCommonAPIProtocol(data, NomicsAPIError);
};
