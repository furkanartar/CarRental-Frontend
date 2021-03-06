import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/dto/carDetail';
import { Brand } from 'src/app/models/entity/brand';
import { CarImage } from 'src/app/models/entity/carImage';
import { Color } from 'src/app/models/entity/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {CarDetailService} from '../../services/car-detail.service';
import {CarImageService} from '../../services/car-image.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  colors: Color[];
  brands: Brand[];
  carImages: CarImage[];
  dataLoaded = false;

  filterText: string = '';
  brandId: number;
  colorId: number;
  path = "https://localhost:44304";

  constructor(
    private carDetailService: CarDetailService,
    private carImageService:CarImageService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarDetailsByBrandIdandColorId(
          params['brandId'],
          params['colorId']
        );
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCarDetails();
        this.getColors();
        this.getBrands();
      }
    });
  }

  getCarDetailsByBrandIdandColorId(brandId: number, colorId: number) {
    this.carDetailService
      .getCarDetailsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getColors() {
    this.colorService
      .getColors()
      .subscribe((Response) => (this.colors = Response.data));
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((Response) => (this.brands = Response.data));
  }

  getCarDetails() {
    this.carDetailService.getAllCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carDetailService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
