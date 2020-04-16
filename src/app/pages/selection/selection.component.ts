import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  selectedFeature;
  featureName;
  active = 1;

  images = [
    // Water
    { _id: 'id1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPBc0odSHUjop5TE34fKXuyGdj1vo7b_R6EIdIOJaS8nAU4acX&usqp=CAU', name: 'water' },
    // Trees
    { _id: 'id3', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC0QBigXqbbxDCWq8XARvRGTo5gKg1EtdD1xI3FJs_5TUE089S&usqp=CAU', name: 'trees' },
    // Deserts
    { _id: 'id5', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwLX9NNa_iTAgsSGJa24aTXYd7c3myiKYGKdy0RU6NN00VRa3g&usqp=CAU', name: 'desert' },
    // Water
    { _id: 'id2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMLjM4l0UhFnukCVD8Y6erExULS3g5YUev0hdg6Lt1QiDFImAu&usqp=CAU', name: 'water' },
    // Corall reefs
    { _id: 'id6', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPEdrmheg87M3Pk8nYyxgvj7OLk2c2m6YmrqczQl7tA87C2cQY&usqp=CAU', name: 'coralreefs' },
    // Roads
    { _id: 'id7', imageUrl: 'https://image.shutterstock.com/image-vector/road-way-journey-highway-vector-260nw-1604671930.jpg', name: 'road' },
    // Trees
    { _id: 'id4', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC0QBigXqbbxDCWq8XARvRGTo5gKg1EtdD1xI3FJs_5TUE089S&usqp=CAU', name: 'trees' },
    // Vegetations
    { _id: 'id9', imageUrl: 'https://image.shutterstock.com/image-photo/green-leaves-vegetation-on-wall-600w-1223737885.jpg', name: "vegetation" },
    // Roads
    { _id: 'id8', imageUrl: 'https://image.shutterstock.com/image-vector/road-shape-cartoon-style-vector-600w-1556597894.jpg', name: 'road' },

  ];
  selectedImages = [];

  constructor(private router: Router) {
    this.featureName = localStorage.getItem('feature');
    if (!this.featureName) {
      this.router.navigate(["/select-feature"]);
    }
    this.selectedFeature = this.featureName.toLowerCase().replace(/ +/g, "")
    console.log(this.selectedFeature)
  }


  ngOnInit() {
  }

  pushImages(image) {
    let number = this.selectedImages.findIndex(x => x._id == image._id)
    if (number >= 0) {
      this.selectedImages.splice(number, 1)
    } else {
      this.selectedImages.push(image)
    }
  }

  imagesSelected() {
    // Compare the selected images with the name of the feature.
    let imageCount = this.images.filter(x => x.name == this.selectedFeature)
    let selectedCount = this.selectedImages.filter(x => x.name == this.selectedFeature)
    if (this.selectedImages.length > 0 && this.selectedImages.length == imageCount.length && imageCount.length == selectedCount.length) {
      jQuery('#success-modal').modal('show');
    } else {
      jQuery('#failure-modal').modal('show');
    }
  }

  coutinue() {
    jQuery('#success-modal').modal('hide');
    // localStorage.removeItem('feature');
    this.router.navigate(["/leveltwo"]);
  }

  tutorial() {
    jQuery('#failure-modal').modal('hide');
    this.router.navigate(["/tutorial"]);
  }
}
