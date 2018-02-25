import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WeatherService } from './weather.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather';
  apiData: any[] = [];
  weatherData: object[] = [];
  weather: any[] = [];
  weatherHours: object[] = [];
  todayDate = "";


  
  constructor(public service: WeatherService){   
    this.service.getData().subscribe(weather => {  
      this.weather = weather.list;
      this.apiData = weather;
      //console.log(weather);          
      // console.log(this.weatherData);
      this.getDays(weather);
      this.getDayInfo(this.todayDate);
    });   
        
  }

  ngOnInit() {
    
  }
    
  getDays(data) {    
    let date = data.list[0].dt_txt.split(" ")[0];
    let weatherMain = data.list[0].weather[0].main;
    let temp: number[] = [0];
    let maxTemp:"";
    let days: any[] = [];    

    for(let item of data.list){
      if(item.dt_txt.split(" ")[0] == date){
        temp.push(item.main.temp_max);
      }
      else{    
        maxTemp = Math.max.apply(null, temp);
        days.push( {day:date, temp:maxTemp, weather: weatherMain} );        
        date = item.dt_txt.split(" ")[0];  
        weatherMain = item.weather[0].main;   
      }      
    }
    this.weatherData = days;
    this.todayDate = days[0].day;
    // console.log(days);    
  }

  getDayInfo(day){
    this.weatherHours = [];       
    for(let item of this.weather){
      if(item.dt_txt.split(" ")[0] == day){
        this.weatherHours.push(item);        
      }      
    }
    //console.log(this.weatherHours);
  }
   

}
