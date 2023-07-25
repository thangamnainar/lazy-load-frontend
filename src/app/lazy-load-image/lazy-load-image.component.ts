import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-lazy-load-image',
  templateUrl: './lazy-load-image.component.html',
  styleUrls: ['./lazy-load-image.component.sass']
})
export class LazyLoadImageComponent implements OnInit {
  videoId: any;
  data: any[] = [];
  arr: any[] = [];
  url!: string;
  img1: string = 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8='
  img2: string = 'https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg'
  img3: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMK2Hm4-jxPbQEf25HFZj0Pn2f0E0dxStXFS32nR52Cg11qhOirj-u2jzPL5EoAPvultM&usqp=CAU'
  img4: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGpSv0okC8bm-n5Ert8Bs3bxLkgKNLuhLgDfNNV_DmS5aNZPoNPIM-8E_DZ8CXQBBhpc&usqp=CAU'


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
          this.videoId = element.id;
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

  options: IntersectionObserverInit = {
    root: null,
    threshold: 0.5,
  };

  getImgae(imageId:any) {
    this.apiService.getImgae(imageId).subscribe({
      next: (response: any) => {
        this.url = response.data;
        const index = this.data.findIndex(({id}) => +imageId == id);
        console.log('index',index);
        console.log('this.data',this.data);
        (index != -1 && this.data[index]) && (this.data[index].imgUrl = this.url);
        // console.log('url', this.url);
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  get(imageId: any) {
    console.log(`inside of id ${imageId} `);
  }

  callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // console.log('entry',entry);
      if (entry.isIntersecting) {
        const imageId = entry.target.id;
        console.log('videoId.........................',imageId);
        this.get(imageId); // Call the get() function with the correct videoId
        this.getImgae(imageId)
        observer.unobserve(entry.target); // Unobserve the element to prevent multiple calls
      }
    });
  };

  observeIntersection(imageId:string) {
    // console.log('observeIntersection',videoId);
    // this.arr.push(videoId)
    // console.log('arr', this.arr);
    // console.log('videoId',videoId);
    const targetElement = document.getElementById(''+imageId);
    // console.log('targetElement',targetElement);
    if (targetElement) {
      const observer = new IntersectionObserver(this.callback, this.options);
      observer.observe(targetElement);
    }
  }



}
