import { ErrorHandlingService } from "../../utils/services/error-handling.service";
import { Logging } from "../../utils/services/logging.service";
import { DataAccessService } from "../../utils/services/data-access.service";
var vEnv = require("../../config/server_config/mode.json")["mode"];
var encryption_service_1 = require("../../utils/services/encryption.service");
var encyption = new encryption_service_1.EncryptionService();

import { Token } from "../../utils/services/token.service";

export class roleController {
    constructor() {
        Logging("initialize role controller");
    }

    async roles(pRequest, pResponse) {
            let vParams = undefined;
            let responseUser = await DataAccessService.executeSP('getroles');
            if(responseUser != 'fail'){
                pResponse.json({'status':1,userroles:responseUser});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2006, '' );
            }
    }

    async setRole(pRequest, pResponse) {
        if(pRequest.body.rolename) {
            let vParams = {
                'prolename': pRequest.body.rolename
            }
            let responseUser = await DataAccessService.executeSP('addrole', vParams);
            if(responseUser != 'fail'){
                pResponse.json({'status':1});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2007, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }


}
