import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudDataService } from './../../services/crud-data.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private activatedRoute: ActivatedRoute, private crudDataService: CrudDataService) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudDataService.getAllStudentsData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        age: res['age'],
        email: res['email'],
        gender: res['gender'],
        phone: res['phone'],
        std: res['std'],
        address: res['address'],
      });
    });

    this.updateForm = this.formBuilder.group({
      name: ['',Validators.required],
      age: [''],
      email: ['',[Validators.required, Validators.email]],
      gender: [''],
      phone: ['',[
        Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
      ]],
      std: [''],
      address: [''],
    })
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudDataService.updateStudent(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/student-list'))
      }, (err) => {
        console.log(err);
    });
    this.updateForm.reset();
  }

  get name(){
    return this.updateForm.get('name');
}

get email(){
  return this.updateForm.get('email');
}

get phone(){
  return this.updateForm.get('phone');
}

}

