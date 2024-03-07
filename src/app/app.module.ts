import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {ChartModule} from './graph/chart.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		ChartModule,
		AppRoutingModule,
		FormsModule,
		BrowserModule,
		NgApexchartsModule,
		NgbModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
