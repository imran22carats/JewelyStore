import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-calculate-price',
  templateUrl: './calculate-price.component.html',
  styleUrls: ['./calculate-price.component.scss']
})
export class CalculatePriceComponent implements OnInit {
  userRole = '';
  price = 0;
  grams = 0;
  calculateForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.userRole = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.appService.loginEmitter.emit(true);
    this.calculateForm = this.formBuilder.group({
      price: [0, [Validators.required]],
      grams: [0, Validators.required],
      Total: [0],
    });
  }

  get f() { return this.calculateForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.calculateForm.invalid) {
      return;
    }

    const total = this.calculateForm.controls.price.value * this.calculateForm.controls.grams.value;
    const discount = this.userRole !== 'Privileged' ? 0 : total * 0.2;

    this.calculateForm.controls.Total.setValue(total - discount);
  }

}
