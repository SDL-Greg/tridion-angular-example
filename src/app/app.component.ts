import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stringifiedData: any;
  componentdata:any = []
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
      this.onFetchPosts()
   }
  
  onFetchPosts() {
    const query = `{
      componentPresentations(namespaceId: 1, publicationId: 9,
        filter: {schema: {id:2706}, template: {id: 1498},},
        sort: {sortBy: LAST_PUBLISH_DATE, order: Descending}, first: 15) {
        edges {
          cursor
          node {
            itemId
            publicationId
            itemType
            ... on ComponentPresentation {
              itemType
              rawContent {
                data
              }
              component {
                title
                itemId
                schemaId
                customMetas {
                  edges {
                    node {
                      key
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`
   const stringifiedData= JSON.stringify({
      query: query
   })
    const config = {
      headers: {
        'Content-Type':"application/json"
      }
    }
    this.http.post('http://tridion.sdldemo.com:8081/cd/api',stringifiedData, config)      
      .subscribe(responseData => {
        console.log(responseData)
        this.componentdata = responseData['data'].componentPresentations.edges
    })
  }
}
