import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl} from '@models/application';
import {Utils} from '@shared/utils';
import {Observable} from 'rxjs';
import { Scheduling } from '@models/Scheduling';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private sessionEndpoint: string = 'schedule';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public search(pageControl: PageControl, filters?): Observable<ApiResponsePageable<Scheduling>> {
      const paginate = Utils.mountPageControl(pageControl);
      const filterParams = Utils.mountPageControl(filters);

      return this._http.get<ApiResponsePageable<Scheduling>>(`${environment.api}/${this.sessionEndpoint}/search?${paginate}${filterParams}`);
  }

  public getByid(id : number) : Observable<ApiResponse<Scheduling>> {
    return this._http.get<ApiResponse<Scheduling>>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }
  
  public create(request: Scheduling | FormData): Observable<ApiResponse<Scheduling>> {
      return this._http.post<ApiResponse<Scheduling>>(`${environment.api}/${this.sessionEndpoint}/create`, request);
  }

  public copy(id: number): Observable<ApiResponse<Scheduling>> {
    return this._http.post<ApiResponse<Scheduling>>(`${environment.api}/${this.sessionEndpoint}/copy/${id}`, {});
  }    

  public delete(id: number): Observable<DeleteApiResponse> {
      return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

  public update(id: string, request: Scheduling | FormData): Observable<ApiResponse<Scheduling>> {
      return this._http.post<ApiResponse<Scheduling>>(`${environment.api}/${this.sessionEndpoint}/${id}?_method=PATCH`, request);
  }


}
