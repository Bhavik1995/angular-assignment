import { Component, OnInit } from '@angular/core';
import { CrudDataService } from './../../services/crud-data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  Students: any = [];
  name = '';
  students: any;

  constructor(private crudDataService: CrudDataService) { }
  ngOnInit(): void {
    this.crudDataService.getAllStudent().subscribe(res => {
      console.log(res)
      this.Students =res;
  });
}

delete(id:any, i:any) {
  console.log(id);
  if(window.confirm('Do you want to go ahead?')) {
    this.crudDataService.deleteStudent(id).subscribe((res) => {
      this.Students.splice(i, 1);
    })
  }
}

deleteAll(): void{
  if(window.confirm('Do you want to really delete all the records')){
    this.crudDataService.deleteStudentAll().subscribe((res) =>{
      console.log(res);
      // this.showAllData();
      this.ngOnInit();
    })
   }   
  }

// searchAll(): void{
//   this.crudDataService.searchByName().subscribe((res) => {
//     console.log(res)
//     this.Students = res;
//     // this.Students =res;
//     this.ngOnInit();
// })
// }
}
