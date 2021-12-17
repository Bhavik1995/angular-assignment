import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

const routes: Routes = [
  {path: '', pathMatch:'full',redirectTo:'add-student'},
  {path: 'student-list', component: StudentListComponent},
  {path: 'add-student', component: AddStudentComponent},
  {path: 'edit-student/:id',component: UpdateStudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
