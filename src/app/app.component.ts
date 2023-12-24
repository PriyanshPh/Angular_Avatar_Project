import { FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { Users } from './users';
import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Heliverse';
  users:Users[] = [];
  sortingControl = new FormControl('');
  searchControl = new FormControl('');
  totalCount : number = 0;
  pageIndex: number = 0;
  pageSize :number= 5;
  constructor(private appService:AppService){}
  ngOnInit(): void {
    this.get("",'','');
    this.sortingControl.valueChanges.subscribe((value) => {
      if(value){
        this.pageIndex = 0;
        this.pageSize = 5;
        let sorting = this.getSorting(value);
        this.get(sorting.sort, sorting.orderby,this.searchControl.value ?? "");
      }
    })
  }

  doSearch(){
    this.pageIndex = 0;
    this.pageSize = 5;
    let sorting = this.getSorting(this.sortingControl.value ?? "");
    this.get(sorting.sort, sorting.orderby, this.searchControl.value ?? "")
  }

  getSorting(value: string){
    let sort = "";
    let orderby = '';


    if(value.toLowerCase() == "id-by-asc"){
      sort = 'id',
      orderby = 'asc';
    }else if(value.toLowerCase() == "id-by-desc"){
      sort = 'id',
      orderby = 'desc';
    }else if(value.toLowerCase() == "domain-by-asc"){
      sort = 'domain',
      orderby = 'asc';
    }else if(value.toLowerCase() == "domain-by-desc"){
      sort = 'domain',
      orderby = 'desc';
    }else if(value.toLowerCase() == "name-by-asc"){
      sort = 'first_name',
      orderby = 'asc';
    }else if(value.toLowerCase() == "name-by-desc"){
      sort = 'first_name',
      orderby = 'desc';
    }
    return {
      sort,
      orderby
    }
  }

  get(sort:string, orderby:string, search:string){
    this.appService.get(sort, orderby, search, (this.pageIndex+1), this.pageSize).subscribe((response) => {
      this.users = response.body as Users[];
      this.totalCount = response.headers.get('X-Total-Count') ?
      Number(response.headers.get('X-Total-Count')):0;
    });
  }

  handlePageEvent(e:PageEvent){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    let sorting = this.getSorting(this.sortingControl.value ?? "");
    this.get(sorting.sort, sorting.orderby,this.searchControl.value ?? "");
  }
}
