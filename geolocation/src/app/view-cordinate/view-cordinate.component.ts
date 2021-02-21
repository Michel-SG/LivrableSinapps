import { Component, OnInit, OnDestroy } from '@angular/core';
import { View } from '../models/View.models';
import { Subscription } from 'rxjs';
import { ViewCordinateService } from '../services/view-cordinate.service';

@Component({
  selector: 'app-view-cordinate',
  templateUrl: './view-cordinate.component.html',
  styleUrls: ['./view-cordinate.component.scss']
})
export class ViewCordinateComponent implements OnInit, OnDestroy {
  zoom = 7;
  lat = 45.1841602;
  lng = 5.680523;
  viewCordinate: View[];
  viewCordinateSubscription: Subscription;

  constructor(private viewService: ViewCordinateService) { }

  ngOnInit(){
     this.viewCordinateSubscription = this.viewService.viewSubject$.subscribe(
      (views: View[])=>{
        this.viewCordinate = views;
      },
      (error) => {
        console.error(error);
      }
    );
    this.viewService.emitView();
    this.viewService.getCordinates();
  }
  ngOnDestroy(){
    this.viewCordinateSubscription.unsubscribe();
  }

}
