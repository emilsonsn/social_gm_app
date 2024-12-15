import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl } from '@models/application';
import { Automation } from '@models/automation';
import { Utils } from '@shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private sessionEndpoint: string = 'automation';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public search(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<Automation>> {
    const paginate = Utils.mountPageControl(pageControl);
    const filterParams = Utils.mountPageControl(filters);

    return this._http.get<ApiResponsePageable<Automation>>(`${environment.api}/${this.sessionEndpoint}/search?${paginate}${filterParams}`);
  }

  public create(Link: Automation): Observable<ApiResponse<Automation>> {
    return this._http.post<ApiResponse<Automation>>(`${environment.api}/${this.sessionEndpoint}/create`, Link);
  }

  public update(id: number, Link: Automation): Observable<ApiResponse<Automation>> {
    return this._http.patch<ApiResponse<Automation>>(`${environment.api}/${this.sessionEndpoint}/${id}`, Link);
  }

  public delete(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

}


