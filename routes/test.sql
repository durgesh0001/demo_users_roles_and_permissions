DECLARE vStatus INT DEFAULT 0;
vErrorMessage varchar;
vErrorCode INT;
vResult varchar;
vCount INT;
vObject json;
vObject2 json;
vObject3 json;

vPermissionId INT;
BEGIN
   vStatus = 0;
   vPermissionId = ppermissionid;
-- this works
SELECT
   to_json(array_agg(temp)) INTO vObject
FROM
   (
   select email,name from users where users.id in (select user_with_permissions.user_id from user_with_permissions where user_with_permissions.permission_id = vPermissionId )
   and users.is_active=1
   )
   temp;

   SELECT
      to_json(array_agg(temp2)) INTO vObject2
   FROM
      (
       select email,name from users where users.id not in (select user_with_permissions.user_id from user_with_permissions where user_with_permissions.permission_id = vPermissionId )
        and users.is_active=1
      )
      temp2;
      if vObject is null then
      vObject ='[]';
      end if;

        if vObject2 is null then
            vObject2 ='[]';
        end if;

select json_build_object('allowedusers', vObject, 'notallowedusers', vObject2) into vObject3;
SELECT
   json_build_object('status', vStatus, 'result',vObject3 ) INTO vResult;
RETURN vResult;
EXCEPTION
WHEN
   OTHERS
THEN
   vErrorCode = 120;
vStatus = - 1;
GET STACKED DIAGNOSTICS vErrorMessage = MESSAGE_TEXT;
SELECT
   json_build_object('status', vStatus, 'error_code', vErrorCode, 'error_msg', vErrorMessage) INTO vResult;
RETURN vResult;
END
