import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/shared/services/dashboard.service';
import { MatSort, MatPaginator, MatSortable } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public AllCountryDetails: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ['Country', 'NewConfirmed', 'TotalConfirmed'];
  public dataSource: MatTableDataSource<string>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllCountry();
  }
  getAllCountry = () => {
    this.dashboardService.getAllCountryDetails().subscribe((response) => {
      if (response && response['Countries']) {
        this.AllCountryDetails = response['Countries'];
        this.dataSource = new MatTableDataSource(this.AllCountryDetails);
        this.sort.sort(({ id: 'TotalConfirmed', start: 'desc' }) as MatSortable);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        let chart = am4core.create("chartdiv", am4charts.PieChart3D);

        chart.data = response['Countries'];
        let pieSeries = chart.series.push(new am4charts.PieSeries3D());
        pieSeries.dataFields.value = "TotalConfirmed";
        pieSeries.dataFields.category = "Country";
        pieSeries.ticks.template.disabled = true;

      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  currentPage = (pageIndex) => {
    debugger
  }
}
export interface PeriodicElement {
  Country: string;
  NewConfirmed: number;
  TotalConfirmed: number;
}