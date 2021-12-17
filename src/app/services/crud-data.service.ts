import { Injectable } from '@angular/core';
import { Student } from './Student';
// import { Student_data } from '../../../node-rest-api/model/Student_data.js'
import { catchError, map } from 'rxjs/operators';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudDataService {

  // Node/Express API
  REST_API: String = 'http://localhost:8000/api/';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  handleError: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private httpClient: HttpClient) { }

  // Add-Student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.REST_API}/add-student`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //Get All Student Data
  getAllStudent(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  //get single student data
  getAllStudentsData(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/student-data/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  //update the existing student data
  updateStudent(id:any, data:any): Observable<any>{
    let API_URL = `${this.REST_API}/update-student/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  //delete the student data
  deleteStudent(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-student/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }

  //delete all student
  deleteStudentAll(): Observable<any>{    
    let API_URL = `${this.REST_API}/delete-student-all/`;
    return this.httpClient.delete(API_URL);
  }

  // //search by name
  // searchByName(): Observable<any>{
  //   let API_URL = `${this.REST_API}/find-student/`;
  //   return this.httpClient.get(API_URL);
  // }

}
