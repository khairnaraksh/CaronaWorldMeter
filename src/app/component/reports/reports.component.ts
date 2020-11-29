import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/shared/services/dashboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Moment } from 'moment';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('DateCountryModal', { static: false }) public DateCountryModal: ModalDirective;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public selected: { startDate: Moment, endDate: Moment };
  public allCountryDetails: string[] = [];
  public countrySelected: string[] = [];
  public SelectedCountry: string;
  public Date: string;
  public dateWiseInfo: any;

  public displayedColumns: string[] = ['Country', 'Date', 'Confirmed', 'Recovered'];
  public dataSource: MatTableDataSource<string>;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllCountryInfo();
  }
  // getAllCountryName = () => {
  //   this.dashboardService.getAllCountry().subscribe(response => {
  //     if (response) {
  //       this.allCountry = response;
  //     }
  //   });
  // }
  getAllCountryInfo = () => {
    this.dashboardService.getAllCountryDetails().subscribe((response) => {
      if (response && response['Countries']) {
        this.allCountryDetails = response['Countries'];
      }
    })
  }
  onChangecountry = (countryName, selectedDate) => {
    this.SelectedCountry = this.allCountryDetails.find(x => x['Country'].toLowerCase() === countryName.toLowerCase());
    this.Date = this.SelectedCountry['Date'];

    let chart = am4core.create("barchartdiv", am4charts.XYChart);

    chart.data = [{
      "CaseType": "New Recovered",
      "Count": this.SelectedCountry['NewRecovered']
    }, {
      "CaseType": "New Deaths",
      "Count": this.SelectedCountry['NewDeaths']
    }, {
      "CaseType": "New Confirmed",
      "Count": this.SelectedCountry['NewConfirmed']
    }];
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "CaseType";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Todays Count";
    let series = chart.series.push(new am4charts.ColumnSeries());
    // series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    series.columns.template.fill = am4core.color("#104547"); // fill
    series.dataFields.valueY = "Count";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.dataFields.categoryX = "CaseType";
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    this.getdataOnDate(countryName, selectedDate);
    this.DateCountryModal.show();
  }

  getdataOnDate = (countryName, dateRange) => {
    let FromDate = dateRange.startDate ? dateRange.startDate._d.toISOString() : new Date().toISOString();
    let ToDate = dateRange.endDate ? dateRange.endDate._d.toISOString() : new Date().toISOString();
    countryName = countryName.toLowerCase();
    this.dashboardService.getDataByDate(countryName, FromDate, ToDate).subscribe(response => {
      if (response) {
        this.dateWiseInfo = response;
        this.dataSource = new MatTableDataSource(this.dateWiseInfo);
        this.dataSource.sort = this.sort;
      }
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export interface PeriodicElement {
  Country: string;
  Date: Date;
  Confirmed: number;
  Recovered: number;
}
