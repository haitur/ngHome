import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { trail } from "./_models/trail.model";
import { apiService } from "./_services/apiService.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("f") signupForm: NgForm;

  private time: Date = new Date();
  public trails: trail[] = new Array<trail>();
  public products: trail[] = new Array<trail>();

  constructor(private ApiService: apiService) {}

  ngOnInit() {
    this.populateTables(this.ApiService.get());
  }

  sortDateAscDesc(): void {
    this.trails = this.trails.reverse();
  }

  clearSearch(): void {
    this.populateTables(this.ApiService.get());
  }

  onSubmit(): void {
    let searchedNumber: number = +this.signupForm.value.searchTerm;
    this.filterTables(this.ApiService.get(), searchedNumber);
  }

  private populateTables(response: trail[]): void {
    this.trails = response.filter(trail => trail.ID != -1);
    this.products = response.filter(product => product.ID == -1);
  }

  private filterTables(response: trail[], num: number): void {
    this.trails = response.filter(
      trail => trail.productNumber == num && trail.ID != -1
    );
    this.products = response.filter(
      product => product.productNumber == num && product.ID == -1
    );
  }

  public deleteTrail(trailIndex: number): void {
    this.populateTables(this.ApiService.delete(trailIndex));
  }

  public updateProduct(productNumber: number): void {
    this.populateTables(this.ApiService.update(productNumber));
  }

  public isTrailEnded(date: string): boolean {
    let endTime: Date = new Date(date);
    let currentTimeString: string = this.time.toString();
    let currentTime: Date = new Date(currentTimeString);
    if (endTime > currentTime) {
      return true;
    }
    return false;
  }
}
