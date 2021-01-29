import { ErrorHandlingService } from "../../utils/services/error-handling.service";
import { Logging } from "../../utils/services/logging.service";
import { DataAccessService } from "../../utils/services/data-access.service";
var vEnv = require("../../config/server_config/mode.json")["mode"];
var encryption_service_1 = require("../../utils/services/encryption.service");
var encyption = new encryption_service_1.EncryptionService();

import { Token } from "../../utils/services/token.service";

export class userController {
    constructor() {
        Logging("initialize user controller");
    }

    async getAllUserPermissions(pRequest, pResponse) {
        if(pRequest.query.userId) {
            let vParams = {
                'ppermissionid': pRequest.query.permissionid,
            }
            let responseUser = await DataAccessService.executeSP('geruserpermissions', vParams);
            if(responseUser != 'fail'){
                pResponse.json({'status':1,userroles:responseUser});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9006, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }

    async setRole(pRequest, pResponse) {
        if(pRequest.params.id) {
            let vParams = {
                'puserid': pRequest.params.id,
                'proleid': pRequest.body.roleId
            }
            let response = await DataAccessService.executeSP('setusersroles', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2011, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }
    async getRole(pRequest, pResponse) {
        if(pRequest.params.id) {
            let vParams = {
                'puserid': pRequest.params.id
            }
            let response = await DataAccessService.executeSP('getusersroles', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1,data:response});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2006, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }

    async setPermission(pRequest, pResponse) {
        if(pRequest.params.id) {
            let vParams = {
                'puserid': pRequest.params.id,
                'ppermissionid': pRequest.body.permissionId
            }
            let response = await DataAccessService.executeSP('setuserspermissions', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2010, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }
    async getPermission(pRequest, pResponse) {
        if(pRequest.params.id) {
            let vParams = {
                'ppermissionid': pRequest.params.id
            }
            let response = await DataAccessService.executeSP('getuserspermissions', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1,data:response});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2008, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }


}
