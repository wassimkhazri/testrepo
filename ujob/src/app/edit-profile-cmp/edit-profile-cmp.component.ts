import { Component, OnInit } from '@angular/core';
import { EditProfUserService } from '../edit-prof-user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile-cmp',
  templateUrl: './edit-profile-cmp.component.html',
  styleUrls: ['./edit-profile-cmp.component.scss']
})
export class EditProfileCmpComponent implements OnInit {

    user: any;
    editProfData = {
      
      username: '',
    
      email: '',
   
      image: '',
      phone: '',
     
    };
    
    constructor(private edit: EditProfUserService,private router: Router) {}
  
    ngOnInit(): void {
      // this..subscribe(user=>{
      //   this.editProfData=user
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.user);
      // })
    }
    editProf(form: NgForm) {
      // console.log(form);
      var obj = form.value;
      console.log(obj);
      var id = this.user._id;
  
      this.edit.editProf(id, obj).subscribe(
        (res: any) => console.log(res)
        // (err: any) => console.log(err)
  
      );
      this.router.navigate(['/myprofile-cmp'])
    }
  }

