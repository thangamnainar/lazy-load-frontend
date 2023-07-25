import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.sass']
})
export class VideoUploadComponent implements OnInit {

  selectedFile: File | null = null;
  url!: string;
  img1:string = 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8='
  img2:string = 'https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg'
  img3:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMK2Hm4-jxPbQEf25HFZj0Pn2f0E0dxStXFS32nR52Cg11qhOirj-u2jzPL5EoAPvultM&usqp=CAU'
  img4:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGpSv0okC8bm-n5Ert8Bs3bxLkgKNLuhLgDfNNV_DmS5aNZPoNPIM-8E_DZ8CXQBBhpc&usqp=CAU'

  constructor(
    private apiService: ApiServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.observeIntersection();
    // this.getVideo()
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
  }

  getVideo() {
    // this.apiService.getVideo().subscribe({
    //   next: (response: any) => {
    //     this.url = response.data;
    //     console.log('url', this.url);
    //     console.log('response', response);
    //     this.changeDetectorRef.detectChanges(); // Manually trigger change detection
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  // ts.file
// Assuming you are inside a class called VideoUploadComponent

options: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
};

get() {
  console.log("inside of test4");
}

callback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      this.get(); // Call the get() function
      this.getVideo()
      observer.unobserve(entry.target); // Unobserve the element to prevent multiple calls
    }
  });
};

observeIntersection() {
  const targetElement = document.getElementById("test4");
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
