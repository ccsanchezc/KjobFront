import { Component, OnInit } from '@angular/core';
import { PostJobs } from '../../post-jobs.model';
import { PostService } from '../../post.service';
 
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  searchResults: PostJobs ;
  resultadosfinal : Array<PostJobs> [] = [] 
  searchQuery: string;
  displayQuery: string;
  constructor(private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

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
  }
  PostSearch = () =>{
  this.PostService.Post(this.searchQuery).then((response)=>{
    this.searchResults = response;
    this.displayQuery = this.searchQuery;
    //alert('Total repositories found: '+response.total_count);
     console.log(response.data);
    
  },(error) => {
   // alert('Error: '+ error.statusText);
   
   this.displayQuery= "error";
  })

}

}
