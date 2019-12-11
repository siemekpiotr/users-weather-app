import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss']
})
export class HomeWeatherComponent implements OnInit {
  @Input() city: string;
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public chartPreloader: boolean = true;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getWeatherForecast();
  }

  getWeatherForecast(): void {
    this.homeService.getWeatherForecast(this.city).subscribe(
      res => {
        console.log(res);
        const chartData = [{ data: [], label: 'Temperature' }, { data: [], label: 'Humidity' }];
        for (let i = 0; i < 9; i++) {
          chartData[0].data.push(res.list[i].main.temp);
          chartData[1].data.push(res.list[i].main.humidity / 100);
          this.barChartLabels.push(res.list[i].dt_txt.match(/[0-9]{2}:[0-9]{2}/));
        }
        this.barChartData = chartData;
      },
      err => this.chartPreloader = false,
      () => this.chartPreloader = false,
    );
  }
}
