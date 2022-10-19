import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDtoUpdParticipation, UserView } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl: string = environment.dataUrl

  constructor(
    private httpC : HttpClient,
  ) { }

  getOneUser(id: number): Observable<UserView>{
    return this.httpC.get<UserView>(this._apiUrl+"participants/" + id)
  }

  updateUserParticipation(user: UserDtoUpdParticipation){
    return this.httpC.patch(
      this._apiUrl + "participants/" + user.id,
      user
    )
  }
}
