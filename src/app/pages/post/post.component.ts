import { Component, OnInit , PipeTransform} from '@angular/core';
import { PostJobs } from '../../post-jobs.model';
import { PostService } from '../../post.service';
 
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

//table

import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  searchResults: PostJobs ;
  resultadosfinal : PostJobs  ;
  searchQuery: string;
  displayQuery: string;
  countries$: Observable<PostJobs[]>;
  filter = new FormControl('');
  constructor(private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router) {
      
     }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.searchQuery = params.get('query');
        this.displayQuery = params.get('query'); 
        //this.pagina = params.get('pagina');    
        this.PostSearch();
       
      })
   //  this.route.data.subscribe((result) => {
     //  this.title = result.title
      //});
      //prueba

  }
  PostSearch = () =>{
  this.PostService.Post(this.searchQuery).then((response)=>{
    this.searchResults = response;
    this.displayQuery = this.searchQuery;
    //alert('Total repositories found: '+response.total_count);
     console.log(response.data);
    this.countries$ = Observable.apply(response);
  },(error) => {
   // alert('Error: '+ error.statusText);
   
   this.displayQuery= "error";
  })

}

}

// tabla
 