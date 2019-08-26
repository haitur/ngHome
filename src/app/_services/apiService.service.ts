import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";

import { trail } from "../_models/trail.model";

@Injectable()
export class apiService {
  constructor(private http: HttpClient) {}

  readonly endPoint = "http://localhost:62059";

  public items: trail[] = [
    {
      ID: 49,
      productID: 1,
      productNumber: 1,
      name: "product1  ",
      startTime: "2018-02-22T16:59:07",
      endTime: "2018-03-22T16:59:07",
      icon: "product1  "
    },
    {
      ID: -1,
      productID: -1,
      productNumber: 2,
      name: "product2  ",
      startTime: "0001-01-01T00:00:00",
      endTime: "0001-01-01T00:00:00",
      icon: "product2  "
    },
    {
      ID: -1,
      productID: -1,
      productNumber: 3,
      name: "product3  ",
      startTime: "0001-01-01T00:00:00",
      endTime: "0001-01-01T00:00:00",
      icon: "product3  "
    }
  ];

  get(): trail[] {
    return this.items;
  }

  update(productNumber: number): trail[] {
    let time: Date = new Date();
    let currentTimeString: string = time.toString();
    let currentTime: Date = new Date(currentTimeString);
    let endTime: Date = new Date(currentTime);
    endTime.setMonth(endTime.getMonth() + 1);

    let data = {
      productNumber: productNumber,
      startTime: currentTime,
      endTime: endTime
    };
    this.items.filter(item => item.productNumber === productNumber)[0].ID = 1;
    this.items.filter(
      item => item.productNumber === productNumber
    )[0].startTime = data.startTime.toDateString();
    this.items.filter(
      item => item.productNumber === productNumber
    )[0].endTime = data.endTime.toDateString();
    return this.items;
  }

  delete(trailIndex: number): trail[] {
    this.items.filter(item => item.ID === trailIndex)[0].ID = -1;
    return this.items;
  }
}
