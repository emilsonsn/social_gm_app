import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl} from '@models/application';
import { PrizeDraw } from '@models/PrizeDraw';
import {Utils} from '@shared/utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrizeDrawService {

  private sessionEndpoint: string = 'prize-draw';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public all(pageControl: PageControl, filters?): Observable<ApiResponsePageable<PrizeDraw>> {
    const paginate = Utils.mountPageControl(pageControl);
    const filterParams = Utils.mountPageControl(filters);

    return this._http.get<ApiResponsePageable<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/all?${paginate}${filterParams}`);
}

  public search(pageControl: PageControl, filters?): Observable<ApiResponsePageable<PrizeDraw>> {
      const paginate = Utils.mountPageControl(pageControl);
      const filterParams = Utils.mountPageControl(filters);

      return this._http.get<ApiResponsePageable<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/search?${paginate}${filterParams}`);
  }

  public getByid(id : number) : Observable<ApiResponse<PrizeDraw>> {
    return this._http.get<ApiResponse<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }
  
  public create(request: PrizeDraw | FormData): Observable<ApiResponse<PrizeDraw>> {
      return this._http.post<ApiResponse<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/create`, request);
  }

  public copy(id: number): Observable<ApiResponse<PrizeDraw>> {
    return this._http.post<ApiResponse<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/copy/${id}`, {});
  }    

  public delete(id: number): Observable<DeleteApiResponse> {
      return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

  public update(id: string, request: PrizeDraw | FormData): Observable<ApiResponse<PrizeDraw>> {
      return this._http.post<ApiResponse<PrizeDraw>>(`${environment.api}/${this.sessionEndpoint}/${id}?_method=PATCH`, request);
  }


}
