import { View } from '../models/View.models';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewCordinateService {
  private viewCordinate: View[] = [];
  viewSubject$ = new Subject<View[]>();
  parser = new DOMParser();
  constructor(private http: HttpClient) { }

  emitView(){
    this.viewSubject$.next(this.viewCordinate);
  }

   getCordinates(){

    this.http.get('http://data.lacub.fr/wfs?key=9Y2RU3FTE8&SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=ST_PARK_P&SRSNAME=EPSG:4326',{  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml'),  
          responseType: 'text'  
    }
    ).subscribe((data: any)=>{
      const xmlDoc = this.parser.parseFromString(data, 'text/xml');
      const post = xmlDoc.getElementsByTagName('gml:pos')[0].firstChild;
      const sep = post.textContent.split(' ');
      const tab = [];
      const posts = xmlDoc.getElementsByTagName('gml:pos');
      tab.push(posts)
      tab.forEach(xmlNode=>{
        const node = xmlNode.firstChild;
        for (let i=0; i<xmlNode.length; i++){
            let valuesOfNode = xmlNode[i].firstChild;
            let splitValues = valuesOfNode.textContent.split(' ');
            let objectCordinate={
              latitude: parseFloat(splitValues[0]),
              longitude: parseFloat(splitValues[1])
            }; 
          
          this.viewCordinate.push(objectCordinate);
        }
        
      });
      this.emitView();
    },
    (error)=>{
      
      console.error(error);
    }
    )
  }
}
