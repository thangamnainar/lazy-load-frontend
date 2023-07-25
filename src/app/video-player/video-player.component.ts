import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.sass']
})
export class VideoPlayerComponent {
  videoUrl: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchVideoUrl();
  }

  fetchVideoUrl() {
    const videoId = '1';
    console.log('inside of fetchVideoUrl');
    this.http.get<string>(`http://localhost:3000/video/stream/${videoId}`).subscribe(
      (res) => {
        console.log('ressssssss', res);
        this.videoUrl = res;
        console.log('success');
        console.log('videoUrl', this.videoUrl);
      },
      (error) => {
        console.error('Failed to fetch video URL:', error);
      }
    );
  }
  

  
}
