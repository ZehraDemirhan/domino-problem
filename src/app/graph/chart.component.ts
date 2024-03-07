import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { ApexChart, ApexStroke } from 'ng-apexcharts';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
	chartOptions!: ChartOptions;
	categories: string[] = [];
	results: number[] = [];
	xAxis: string = 'numDominoes';
	graphEnabled : boolean = false;

	@Input() resultRecords: any | undefined;

	constructor() {}

	axisNameMap: any= {
		numDominoes: 'Number of Dominoes',
		randomNumber: 'Weighted Number',
		trialCount: 'Trial Count',
		result: 'Result',
		uniqueId: 'Unique ID',
	};

	ngOnChanges(): void {
		this.resultRecords?.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[this.xAxis] - b[this.xAxis]);
		this.categories = this.resultRecords?.map((record: { [x: string]: string; }) => record[this.xAxis].toString().slice(0, 4)) || [];
		this.results = this.resultRecords?.map((record: { result: any; }) => record.result) || [];
		this.chartOptions = this.getChartOptions();
	}

	selectXAxis(event: any): void {
		this.xAxis = event.target.value;
		this.ngOnChanges();	
	}

	getChartOptions(): ChartOptions {
		const labelColor = '#A1A5B7';
		const borderColor = '#eff2f5';
		const baseColor = '#2191e8cf';
		const lightColor = '#009ef70f';

		return {
			series: [
				{
					name: 'Results',
					data: this.results
				},
			],
			chart: {
				fontFamily: 'inherit',
				type: 'area',
				height: 350,
				toolbar: {
					show: false,
				},
			},
			legend: {
				show: false,
			},
			dataLabels: {
				enabled: false,
			},
			fill: {
				type: 'solid',
				opacity: 0.2,
			},
			stroke: {
				curve: 'smooth',
				show: true,
				width: 3,
				colors: [baseColor],
			},
			xaxis: {
				categories: this.categories,
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				labels: {
					style: {
						colors: labelColor,
						fontSize: '12px',
					},
				},
				crosshairs: {
					position: 'front',
					stroke: {
						color: baseColor,
						width: 1,
						dashArray: 3,
					},
				},
				tooltip: {
					enabled: false,
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: labelColor,
						fontSize: '12px',
					},
				},
			},
			states: {
				normal: {
					filter: {
						type: 'none',
						value: 0,
					},
				},
				hover: {
					filter: {
						type: 'none',
						value: 0,
					},
				},
				active: {
					allowMultipleDataPointsSelection: false,
					filter: {
						type: 'none',
						value: 0,
					},
				},
			},
			tooltip: {
				style: {
					fontSize: '12px',
				},
				y: {
					formatter(val: number) {
						return val + ' Subsets';
					},
				},
			},
			colors: [lightColor],
			grid: {
				borderColor,
				strokeDashArray: 4,
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			markers: {
				strokeColors: baseColor,
				strokeWidth: 3,
			},
		};
	}
}


type DominoesResult = {
	numDominoes: number,
	randomNumber: number,
	trialCount: number,
	result: number,
	uniqueId: number,
}

type ChartOptions = {
	series: any[];
	chart: ApexChart;
	legend: {
		show: boolean;
	};
	dataLabels: {
		enabled: boolean;
	};
	fill: {
		type: string;
		opacity: number;
	};
	stroke: ApexStroke;
	xaxis: {
		categories: string[];
		axisBorder: {
			show: boolean;
		};
		axisTicks: {
			show: boolean;
		};
		labels: {
			style: {
				colors: string;
				fontSize: string;
			};
		};
		crosshairs: {
			position: string;
			stroke: {
				color: string;
				width: number;
				dashArray: number;
			};
		};
		tooltip: {
			enabled: boolean;
		};
	};
	yaxis: {
		labels: {
			style: {
				colors: string;
				fontSize: string;
			};
		};
	};
	states: {
		normal: {
			filter: {
				type: string;
				value: number;
			};
		};
		hover: {
			filter: {
				type: string;
				value: number;
			};
		};
		active: {
			allowMultipleDataPointsSelection: boolean;
			filter: {
				type: string;
				value: number;
			};
		};
	};
	tooltip: {
		style: {
			fontSize: string;
		};
		y: {
			formatter(val: number): string;
		};
	};
	colors: string[];
	grid: {
		borderColor: string;
		strokeDashArray: number;
		yaxis: {
			lines: {
				show: boolean;
			};
		};
	};
	markers: {
		strokeColors: string;
		strokeWidth: number;
	};
};
