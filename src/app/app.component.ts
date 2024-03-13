/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component } from '@angular/core'

import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Component({
 	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	numDominoes: number | undefined
	randomNumber: number | undefined
	trialCount: number | undefined
	result: number | undefined
	resultRecords: DominoesResult[] = []
	chartResultRecords: DominoesResult[] = []
	denominator: number | undefined;
	numerator: number | undefined;
	weightedNumber: number | undefined;

	download() {
		var a = document.createElement("a"); //Create <a>

		// Create a csv content with the resultRecords array
		let csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "Number of Dominoes,Trial Count,Weighted Number,Result\n";
		this.resultRecords.forEach((record) => {
			csvContent += `${record.numDominoes},${record.trialCount},${record.randomNumber.toFixed(3)},${record.result || 'Error'}\n`;
		})
		a.href = csvContent;
		a.download = "Domino_Problem.csv";
		a.click(); //Downloaded file
	}

	clearForm() {
		this.numDominoes = undefined;
		this.randomNumber = undefined;
		this.trialCount = undefined;
		this.result = undefined;
		this.denominator = undefined;
		this.numerator = undefined;
		this.weightedNumber = undefined;
	}

	deleteAllRecords() {
		this.resultRecords = [];
		this.chartResultRecords = [];
	}

	generateRandomNumber () {
		this.weightedNumber = Math.random();
		this.numerator = undefined;
		this.denominator = undefined;
	}

	setWeightedNumber () {
		this.weightedNumber = undefined;
		if (this.numerator && this.denominator){
			this.weightedNumber = this.numerator / this.denominator;
		}
		
	}

	findResult (dominoCount: number, weightedNumber: number, trialCount: number) {

		let minNumberOfDesiredSubsets = Number.MAX_SAFE_INTEGER;

		try {
			for (let i = 0; i < trialCount; i++){
				let kerimov = new Kerimov(dominoCount, weightedNumber);
				let desiredSubsetNum = kerimov.numberOfWeightedSubsets();
				if (desiredSubsetNum < minNumberOfDesiredSubsets){
					minNumberOfDesiredSubsets = desiredSubsetNum;
				}
			}
	
			this.result = minNumberOfDesiredSubsets;
		} catch (error) {
			this.showAlert('Maximum call stack size exceeded. An error occurred while trying to find the result. Please enter less number of dominoes and try again.')
			this.result = 0;
		}

	}

	submit(){
		// If any input is empty show alert
		if (!this.numDominoes || !this.weightedNumber || !this.trialCount){
			this.showAlert('All fields are required and must be numbers. Please correct your inputs and try again.')
			return;
		}

		this.findResult(this.numDominoes, this.weightedNumber, this.trialCount);
		this.resultRecords.push({
			numDominoes: this.numDominoes!,
			randomNumber: this.weightedNumber!,
			trialCount: this.trialCount!,
			result: this.result!,
			uniqueId: Math.floor(Math.random() * 1000)
		})
		this.chartResultRecords = [...this.resultRecords];
	}

	deleteRecord(id: number){
		this.resultRecords = this.resultRecords.filter(record => record.uniqueId !== id);
		this.chartResultRecords = [...this.resultRecords];
	}

	showAlert(
		html: string,
		type: SweetAlertIcon = 'error',
		others: SweetAlertOptions = {},
	): Promise<SweetAlertResult> {
		let timerInterval: any;
	
		if (others.html) html = others.html as string;
	
		return Swal.fire({
			icon: type,
			title: others.title ?? type.toUpperCase(),
			html,
			didOpen: () => {
				if (!others.timer) return;
	
				timerInterval = setInterval(() => {
					Swal.getHtmlContainer()!.querySelector('strong')!.textContent = (
						Swal.getTimerLeft()! / 1000
					).toFixed(0);
				}, 100);
			},
			willClose: () => {
				others.timer && clearInterval(timerInterval);
			},
		});
	}
}

type DominoesResult = {
	numDominoes: number,
	randomNumber: number,
	trialCount: number,
	result: number,
	uniqueId: number,
}

class Kerimov {
	private currentWeight: number;
	private stones: number[];
	private powerSet: number[][];

	constructor(private N: number, private weightedNumber: number) {
		this.currentWeight = 0;
		this.stones = [];
		for (let i = 0; i < N; i++) {
			const x = Math.random();
			this.stones[i] = x;
			this.currentWeight += x;
		}

		// Normalization
		for (let i = 0; i < N; i++) {
			this.stones[i] = this.stones[i] / this.currentWeight;
		}

		this.powerSet = this.generatePowerSet(this.stones);
	}

	generatePowerSet(arr: number[]): number[][] {
		const powerSet: number[][] = [];

		if (arr.length === 0) {
			powerSet.push([]);
		} else {
			const restOfArr = arr.slice(1);
			const subsetsWithoutCurrent = this.generatePowerSet(restOfArr);

			for (const subset of subsetsWithoutCurrent) {
				const subsetWithCurrent = [arr[0], ...subset];
				powerSet.push(subsetWithCurrent);
			}

			powerSet.push(...subsetsWithoutCurrent);
		}

		return powerSet;
	}

	numberOfWeightedSubsets(): number {
		let count = 0;
		for (const subset of this.powerSet) {
			let totalOfSubset = 0;
			for (const stone of subset) {
				totalOfSubset += stone;
			}
			if (totalOfSubset >= this.weightedNumber) {
				count++;
			}
		}
		return count;
	}

	minNumberOfDesiredSubsets(): number {
		let min = Math.pow(2, this.N);
		let current;
		for (let i = 0; i < 1000; i++) {
			current = this.numberOfWeightedSubsets();
			if (current < min) {
				min = current;
			}
		}
		return min;
	}
}

