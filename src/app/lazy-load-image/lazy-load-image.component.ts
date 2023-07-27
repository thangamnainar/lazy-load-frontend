import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-lazy-load-image',
  templateUrl: './lazy-load-image.component.html',
  styleUrls: ['./lazy-load-image.component.scss']
})
export class LazyLoadImageComponent implements OnInit {
  videoId: any;
  data: any[] = [];
  arr: any[] = [];
  url!: string;
  selectedImageFile: File | null = null;
  fileError: string | null = null;


  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllKeys();
    // this.observeIntersection();


  }

  getAllKeys() {
    this.apiService.getAllKeys().subscribe({
      next: (response: any) => {
        this.data = response.data;
        this.data.forEach((element: any) => {
          // this.videoId = element.id;
          setTimeout(() => {
            this.observeIntersection(String(element.id))
          }, 500);
        });
      },
      error(err) {
        console.log('err', err);
      },
    });
  }



  getImgae(imageId: any) {
    console.log('inside of get function');

    this.apiService.getImgae(imageId).subscribe({
      next: (response: any) => {
        this.url = response.data;
        const index = this.data.findIndex(({ id }) => +imageId == id);
        console.log('index', index);
        console.log('this.data', this.data);
        (index != -1 && this.data[index]) && (this.data[index].imgUrl = this.url);
        // console.log('url', this.url);
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  options: IntersectionObserverInit = {
    root: null,
    threshold: 0.5,
  };

  get(imageId: any) {
    console.log(`inside of id ${imageId} `);
  }

  callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log('entry', entry);
      if (entry.isIntersecting) {
        const imageId = entry.target.id;
        console.log('imageIdimageId.........................', imageId);
        this.get(imageId);
        this.getImgae(imageId)
        observer.unobserve(entry.target);
      }
    });
  };

  observeIntersection(imageId: string) {
    console.log('observeIntersection', imageId);
    // this.arr.push(videoId)
    // console.log('arr', this.arr);
    // console.log('videoId',videoId);
    const targetElement = document.getElementById('' + imageId);
    // console.log('targetElement',targetElement);
    if (targetElement) {
      const observer = new IntersectionObserver(this.callback, this.options);
      observer.observe(targetElement);
    }
  }
  uploadImage() {
    if (this.selectedImageFile) {
      console.log('selectedImageFile', this.selectedImageFile);
      const formData = new FormData();
      formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
      this.apiService.saveImage(formData).subscribe({
        next: (response) => {
          console.log('response', response);
          this.getAllKeys();
        }, error: (error) => {
          console.log('error', error);
        }
      });
      this.selectedImageFile=null;
    }
  }

  onFileError(errorMessage: any) {
    this.fileError = errorMessage;
  }


}
