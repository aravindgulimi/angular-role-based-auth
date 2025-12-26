import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthServiceService } from "../service/auth-service.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn :'root'
})

export class RoleGuard implements CanActivate {
    
    
    constructor(private auth: AuthServiceService,
        private route : Router){}

        canActivate(route : ActivatedRouteSnapshot):boolean{
            const expectedRole = route.data['role'] as string;

            if(this.auth.isLoggedIn() && this.auth.hasRole(expectedRole)) {
                return true;
            }
            if(this.auth.isLoggedIn()){
                this.route.navigate(['/dashboard']);
                return false;
            }
            this.route.navigate(['/login']);
            return false;
        }
}