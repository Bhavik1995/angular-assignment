import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudDataService } from './../../services/crud-data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;

  // studentForm = new FormGroup({
  //     name: new FormControl('', Validators.required),
  //     email: new FormControl('')
  // })

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudDataService: CrudDataService) 
    { 

       this.studentForm = this.formBuilder.group({
         name: ['',Validators.required],
         age:[''],
         email:['',[Validators.required, Validators.email]],
         gender:[''],
         phone:['',[
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]],
         std:[''],
         address:['']
       })
    }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudDataService.AddStudent(this.studentForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/student-list'))
      }, (err) => {
        console.log(err);
    });
    this.studentForm.reset();
  }

  get name(){
    return this.studentForm.get('name');
}

get email(){
  return this.studentForm.get('email');
}

get phone(){
  return this.studentForm.get('phone');
}

}
