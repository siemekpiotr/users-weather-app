import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { HomeService } from '../home.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss']
})
export class HomeWeatherComponent implements OnInit {
  @Input() city: string;
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataSets[] = [{ data: [], label: '' }];
  chartPreloader: boolean = true;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getWeatherForecast();
  }

  getWeatherForecast(): void {
    this.homeService.getWeatherForecast(this.city).pipe(
      finalize(() => this.chartPreloader = false),
    ).subscribe(
      res => {
        if (res.list.length > 0) {
          const chartData = [{ data: [], label: 'Temperature' }, { data: [], label: 'Humidity' }];
          for (let i = 0; i < 9; i++) {
            chartData[0].data.push(res.list[i].main.temp);
            chartData[1].data.push(res.list[i].main.humidity / 100);
            this.barChartLabels.push(res.list[i].dt_txt.match(/[0-9]{2}:[0-9]{2}/));
          }
          this.barChartData = chartData;
        }
      },
      err => console.log(err)
    );
  }
}
