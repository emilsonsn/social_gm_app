import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl} from '@models/application';
import {Utils} from '@shared/utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  private sessionEndpoint: string = 'instance';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public search(pageControl: PageControl, filters?): Observable<ApiResponsePageable<any>> {
      const paginate = Utils.mountPageControl(pageControl);
      const filterParams = Utils.mountPageControl(filters);

      return this._http.get<ApiResponsePageable<any>>(`${environment.api}/${this.sessionEndpoint}/search?${paginate}${filterParams}`);
  }

  public getByid(id : number) : Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }
  
  public connect(instanceName : string) : Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/connect/${instanceName}`);
  }

  public group(instanceName : string) : Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/groups/${instanceName}`);
  }

  public create(request: Request | FormData): Observable<ApiResponse<any>> {
      return this._http.post<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/create`, request);
  }

  public delete(id: number): Observable<DeleteApiResponse> {
      return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

  public update(id: number, request: Request): Observable<ApiResponse<any>> {
      return this._http.post<ApiResponse<any>>(`${environment.api}/${this.sessionEndpoint}/${id}?_method=PATCH`, request);
  }


}
