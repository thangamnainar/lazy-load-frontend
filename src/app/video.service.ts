import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideoStream(id: string) {
    const url = `http://localhost:3000/video/stream/${id}`;
    const headers = new HttpHeaders({
      'Accept-Ranges': 'bytes',
      'Content-Type': 'video/mp4'
    });
    return this.http.get(url, {
      headers,
      responseType: 'blob',
      observe: 'response'
    });
  }
}
