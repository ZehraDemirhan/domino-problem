import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		ChartComponent
	],
	imports: [
		NgApexchartsModule,
		NgbModule,
		NgSelectModule,
		FormsModule,
		CommonModule
	],
	providers: [],
	exports: [ChartComponent]
	
})
export class ChartModule { }
