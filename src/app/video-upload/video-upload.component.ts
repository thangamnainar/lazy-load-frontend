import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  selectedFile: File | null = null;
  url!: string;
  data: any[] = [];


  constructor(
    private apiService: ApiServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.observeIntersection();
    // let id =1;
    // this.getVideo(id)
    this.getAllVideoKeys()
  }

  getAllVideoKeys() {
    this.apiService.getAllVideoKeys().subscribe({
      next: (response: any) => {
        this.data = response.data;
        this.data.forEach((element: any) => {
          setTimeout(() => {
            this.observeIntersection(String(element.id))
          }, 500);
        });
        console.log('response', response);
      }, error(err) {
        console.error('err', err);
      },
    })
  }

  onFileSelected(event: any) {
    console.log('event', event);
    this.selectedFile = event.target.files[0];
    console.log('selectedFile', this.selectedFile);
  }


  uploadVideo() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('video', this.selectedFile, this.selectedFile.name);

      this.apiService.saveVideo(formData).subscribe({
        next: (response) => {
          console.log('response', response);
        }, error: (error) => {
          console.log('error', error);
        }
      });
    }
    this.selectedFile= null;
  }


  getVideo(videoId: any) {
    this.apiService.getVideo(videoId).subscribe({
      next: (response: any) => {
        this.url = response.data;
        const index = this.data.findIndex(({ id }) => +videoId == id);
        (index != -1 && this.data[index]) && (this.data[index].videoUrl = this.url);
        // console.log('url', this.url);
        console.log('response', response);
        this.changeDetectorRef.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  // ts.file
  // Assuming you are inside a class called VideoUploadComponent

  options: IntersectionObserverInit = {
    root: null,
    threshold: 0.5,
  };

  get(videoId: any) {
    console.log(`inside of id ${videoId} `);
  }

  callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log('entry',entry);
      if (entry.isIntersecting) {
        const videoId = entry.target.id;
        console.log('videoId.........................', videoId);
        this.get(videoId); // Call the get() function with the correct videoId
        this.getVideo(videoId)
        observer.unobserve(entry.target); // Unobserve the element to prevent multiple calls
      }
    });
  };

  observeIntersection(videoId: string) {
    const targetElement = document.getElementById('' + videoId);
    // console.log('targetElement',targetElement);
    if (targetElement) {
      const observer = new IntersectionObserver(this.callback, this.options);
      observer.observe(targetElement);
    }
  }


  // async createAWSStream(): Promise<S3ReadStream> {
  //   return new Promise((resolve, reject) => {
  //     const bucketParams = {
  //       Bucket: s3Env.bucket,
  //       Key: s3Env.key + '.mp4'
  //     }

  //     try {
  //       const s3 = new AWS.S3({
  //         accessKeyId: s3Env.accessKey,
  //         secretAccessKey: s3Env.secret
  //       });

  //       s3.headObject(bucketParams, (error, data) => {
  //         if (error) {
  //           throw error
  //         };

  //         const options = {
  //           parameters: bucketParams,
  //           s3,
  //           maxLength: data.ContentLength,
  //           byteRange: 1024 * 1024 * 5
  //         };

  //         const stream = new S3ReadStream(options);

  //         resolve(stream);
  //       })
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
  // }
}
