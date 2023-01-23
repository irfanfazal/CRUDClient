import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { AuthenticatedResponse } from '../interfaces/authenticated-response';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService, private http: HttpClient) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const token = localStorage.getItem("loginT");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token))
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    console.log(isRefreshSuccess);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"])
    }
    return isRefreshSuccess;

  }
  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken: string = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean = true;

    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http.post<AuthenticatedResponse>("https://localhost:5001/api/token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe({
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (e) => {
          reject; console.log("Session Expired!! please Re-login", e);
         this.router.navigate(["login"])
        }
      });
    });
    console.log(isRefreshSuccess);
    localStorage.setItem("loginT", refreshRes.token);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);

    console.log(refreshRes);
    return isRefreshSuccess;
  }


}
 /*
       The jwtHelper service has the decodeToken function which can decode our token into the JSON object. 
       Because we have already injected the JwtHelper service into the AuthGuard service,
        let’s modify that service a bit just to see how the decodeToken function works. 
       We are going to add one line of code that checks if the token exists and if it hasn’t expired:
      
       Here, once the access token is expired, we try refreshing it using the refresh token. 
       If the refresh is successful, we store the new set of tokens in the local storage. 
       If the refresh action does not work, we return false and redirect the user back to the login page.
       
 */
