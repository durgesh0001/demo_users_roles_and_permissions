import { ErrorHandlingService } from "../../utils/services/error-handling.service";
import { Logging } from "../../utils/services/logging.service";
import { DataAccessService } from "../../utils/services/data-access.service";

export class permissionController {
    constructor() {
        Logging("initialize permission controller");
    }

    async addPermission(pRequest, pResponse) {
        if(pRequest.body.permissionname) {
            let vParams = {
                ppermissionname:pRequest.body.permissionname
            }
            let response = await DataAccessService.executeSP('addpermissions', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2008, '' );
            }
        }
        else{
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 9004, '' );
        }
    }

    async getPermissions(pRequest, pResponse) {
            let vParams = undefined;
            let response = await DataAccessService.executeSP('getpermissions', vParams);
            if(response != 'fail'){
                pResponse.json({'status':1,data:response});
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2009, '' );
            }
    }

}
