import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
       
    constructor(public http:Http){}
 
    getData(){
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast?id=5128638&APPID=5291301a883920edfa065f457f765096&units=metric')
            .map(res => res.json());
    }

}