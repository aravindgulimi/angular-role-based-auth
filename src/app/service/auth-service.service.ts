import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private api : ApiCallService) { }

  private Token_keys = 'token';
  private User_keys = 'user';

login(email: string, password : any): 
Observable<{token: string,user: User} | null>{
 return this.api.get<User[]>(`/users`, {email, password})
 .pipe(map(users => {
  const user = users && users.length ? users[0] : null;
  if(!user) return null;


    const token = btoa(JSON.stringify({id: user.id, 
      role: user.role, email: user.email} ));

      localStorage.setItem(this.Token_keys, token);

      localStorage.setItem(this.User_keys, JSON.stringify(user));
      return {token, user};
})
 )
}

logout(): any{
  localStorage.removeItem(this.Token_keys);
  localStorage.removeItem(this.User_keys);
}

getToken(): string | null{
  return localStorage.getItem(this.Token_keys);
}

getUser(): User | null{
  const raw = localStorage.getItem(this.User_keys);
  return raw ? JSON.parse(raw): null;
}

isLoggedIn(): boolean{
  return !!this.getToken();
}

hasRole(role : string): any{
  const userRole = this.getUser();
  return !!userRole && userRole.role === role;
}
}