import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  var currentUser = authenticationService.currentUserValue;
  
  authenticationService.currentUser.subscribe(data => {
    currentUser = data;
  })
  if (currentUser) {
    if (route.data['roles']?.indexOf(currentUser.role) === -1) {
      router.navigate(['/401']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
  }
  return true;
};
