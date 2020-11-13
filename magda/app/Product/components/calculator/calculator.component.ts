import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
 calculator: boolean = false
  all: string = '';   //It is possible to declare it as any to spare me from converting
  num1: number;
  num2: number;
  result: number;
  ope: string;

  setEqual(){
    this.num2=+this.all;

    switch (this.ope) {
      case '+':this.result=this.num1+this.num2;break;
      case '-':this.result=this.num1-this.num2;break;
      case '*':this.result=this.num1*this.num2;break;
      case '/':this.result=this.num1/this.num2;break;
    }
    this.all=this.result.toString();
  }

  setAll(s: string) {
    this.all += s;
  }

  setOpe(ope: string) {
    this.num1 = +this.all;     // parseFloat(this.all)//parseInt(this.all)//Number(this.all);
    this.all = '';
    this.ope = ope
  }

  setSign() {
    let num: number = +this.all;
    num *= -1;
    this.all = num.toString();

  }

  setOff() {
    this.all = '';
    this.calculator = false;
  }
}
