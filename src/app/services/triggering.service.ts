import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl } from '@models/application';
import { Link } from '@models/link';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggeringService {

  private sessionEndpoint: string = 'triggering';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public search(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<Link>> {

    return this._http.get<ApiResponsePageable<Link>>(`${environment.api}/${this.sessionEndpoint}/search`);
  }

  public create(data: any): Observable<ApiResponse<any>> {
    return this._http.post<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/create`, data);
  }

  public update(id: number, data: any): Observable<ApiResponse<any>> {
    return this._http.post<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/${id}?_method=PATCH`, data);
  }

  public delete(id: number): Observable<ApiResponse<any>> {
    return this._http.delete<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/${id}`,);
  }
}


