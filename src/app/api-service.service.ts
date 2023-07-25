import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getVideo(id: any) {
    return this.http.get(`http://localhost:3000/video/getVideo/${id}`)
  }

  getImgae(id: any) {
    return this.http.get(`http://localhost:3000/video/getImage/${id}`)
  }
  saveVideo(data: any) {
    return this.http.post('http://localhost:3000/video/upload', data)
  }

  getAllKeys() {
    return this.http.get('http://localhost:3000/video/getAllKeys')
  }

  getAllVideoKeys() {
    return this.http.get('http://localhost:3000/video/getAllVideoKeys')
  }


}
