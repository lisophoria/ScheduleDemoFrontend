import { Authority } from "./authority";

export class CredentialResponse {
  authenticated: boolean;
  name: string;
  authorities: Authority[]

  static convertToObj(object: any): CredentialResponse {
    // if (object == null) {
    //   return null;
    // }

    if (object.errorStatus != undefined) {
      let response = new CredentialResponse();
      response.authenticated = false;
      return response;
    }
    else {
      let response = new CredentialResponse();

      response.name = object.name;
      response.authenticated = object.authenticated;
      response.authorities = object.authorities;

      return response;
    }
  }
}
