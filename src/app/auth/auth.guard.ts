import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { mergeMap, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(AuthService).isLogged().pipe(
    mergeMap((isLogged : boolean) =>{
      
      if(!isLogged)
        router.navigate([''])

      return of(isLogged)
    }
  ))

};
