import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ApiResponsePageable, DeleteApiResponse, PageControl } from '@models/application';
import { Link } from '@models/link';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private sessionEndpoint: string = 'link';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public getLinks(pageControl?: PageControl, filters?: any): Observable<ApiResponsePageable<Link>> {

    return this._http.get<ApiResponsePageable<Link>>(`${environment.api}/${this.sessionEndpoint}/search`);
  }

  public postLink(Link: Link): Observable<ApiResponse<Link>> {
    return this._http.post<ApiResponse<Link>>(`${environment.api}/${this.sessionEndpoint}/create`, Link);
  }

  public patchLink(id: number, Link: Link): Observable<ApiResponse<Link>> {
    return this._http.patch<ApiResponse<Link>>(`${environment.api}/${this.sessionEndpoint}/${id}`, Link);
  }

  public deleteLink(id: number): Observable<DeleteApiResponse> {
    return this._http.delete<DeleteApiResponse>(`${environment.api}/${this.sessionEndpoint}/${id}`);
  }

}


