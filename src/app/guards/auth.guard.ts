import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthServiceService } from "../service/auth-service.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private auth: AuthServiceService, 
        private route: Router) {}

        canActivate(): boolean | UrlTree {
            const token = this.auth.getToken();
            if(token) {
                return true;
            }
            this.route.navigate(['/login']);
            return false;
        }
}