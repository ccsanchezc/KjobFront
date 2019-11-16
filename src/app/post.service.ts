import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostJobs } from './post-jobs.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  contact: Array<PostJobs>;
cachedValues: Array<{
    [query: string]: PostJobs
  }> = [];
  constructor(private http: HttpClient) { }

    Post = (query:string):Promise<PostJobs> => {
    let promise = new Promise<PostJobs>((resolve,reject)=>{
      if(this.cachedValues[query]){
        resolve(this.cachedValues[query]);
      }else{
        this.http.get('http://localhost:3000/posts/').toPromise().then((response)=>{
          resolve(response as PostJobs)
        },(error)=>{
          reject(error);
        })
      }
    })
    return promise
  }
   }
