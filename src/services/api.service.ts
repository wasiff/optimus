import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable()
export class ApiService {

  readonly API: string = 'https://1wc09i5r47.execute-api.ap-southeast-1.amazonaws.com/dev/chartOfAccounts/getLedgers/5a7dc92a4cefed0b653f6e48';

  constructor(private http: HttpClient) {}

  getLedger() {
    return this.http.get(this.API)
      .pipe(
        map((response: any) => {
          return response.message;
        });
  }

}
