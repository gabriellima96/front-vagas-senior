// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const API_TESTE180 = {
  getUserData:
    'https://teste180:8181/G5ServiceAPI/GenericConsult?server=http://localhost:8080&module=rubi&service=br_com_fiep_wf_default&consult=wf_info_solicitante_by_user&usuario=',
  saveForm:
    'https://teste180:8181/G5ServiceAPI/G5Rest?server=http://localhost:8080&module=rubi&service=teste&port=gravarVaga'
};

export const environment = {
  production: false,
  api: API_TESTE180
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
