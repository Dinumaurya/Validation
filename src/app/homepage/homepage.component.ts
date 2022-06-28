import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DataType } from './DataType';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // form:DataType=new DataType();
  vidProThumbnail1: File = null as any;
  txtProName: any;
  txtPro1Name: any;
  txtPro2Name: any;
  txtPro4Name: any;
  txtProPrice: any;
  txtProPrice1: any;
  message: any;
  service: any;
  ImgPath = "http://localhost:56784/Image/";
  result=[]as any;
   imageurl:File=null as any;
  url:any;

  image: any;



  txtFName:any;
  txtLName:any;
  txtEmail:any;
  txtAge:any;
  txtAdd:any;
  txtState:any;
  txtCont:any;
  txtMob:any;
  txterm:any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }



  ProRelated() {
    var txtFName = $('#txtFName').val();
    var txtLName = $('#txtLName').val();
    var txtEmail = $('#txtEmail').val();
    var txtMob = $('#txtMob').val();
    var txtAge = $('#txtAge').val();
    var txtAdd=$('#txtAdd').val();
    var txtState = $('#txtState').val();
    var txtCont=$('#txtCont').val();
    var vidProThumbnail1 = $('#vidProThumbnail1').val();
    var txterm = document.querySelector('input[name="txterm"]:checked');

    if (txtFName == "") {
      swal.fire("Please fill details", "Enter First Name", "error");
    }
    else if (txtLName == "") {
      swal.fire("Please fill details", "Enter Last Name", "error");
    }
    else if (txtEmail == "") {
      swal.fire("Please fill details", "Enter Email-Id", "error");
    }
  
    else if (txtMob == "") {
      swal.fire("Please fill details", "Enter Mobile Number", "error");
    }
    else if (txtAge == "") {
      swal.fire("Please fill details", "Enter Age", "error");
    }
    else if(txtAdd==""){
      swal.fire("Please fill details","Enter Address","error");
    }
    else if (txtState ==null) {
      swal.fire("Please fill details", "Select State", "error");
    }
    else if (txtCont ==null) {
      swal.fire("Please fill details", "Select State", "error");
    }
    else if (vidProThumbnail1 == "") {
      swal.fire("Please fill details", "Please Select Product Image", "error");
    }
    else if (txterm==null) {
      swal.fire("Please fill details", "Accept term & Condition", "error");
    }
    else {

      const filedata=new FormData();
      filedata.append('FirstName',this.txtFName);
      filedata.append('LastName',this.txtLName);
      filedata.append('Email',this.txtEmail);
      filedata.append('MobileNo',this.txtMob);
      filedata.append('Age',this.txtAge);
      filedata.append('Address',this.txtAdd);
      filedata.append('State',this.txtState);
      filedata.append('Country',this.txtCont);
     /// filedata.append('Profilepic',this.vidProThumbnail1);
     $.ajax({
      type: "POST",
      url: "http://localhost:3000/User",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(filedata),

      success: function (data, textStatus, xhr) {
          console.log(data);
          swal.fire("Success", "Inserted successfully", "success")
          location.reload();
      }
  });
    }

  }
  uploadedFile(event){
    const reader = new FileReader();
      
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
      
        reader.onload = () => {
     
          this.url = reader.result as string;
          this.imageurl=<File>event.target.files[0]; 
          const fd = new FormData();
          fd.append('FileName', this.imageurl);
          fd.append('FileSavePath', 'ProductImages');
          this.http.post('http://localhost:50841/SaveFiles/SaveFile', fd)
            .subscribe(res => {
                       console.log(res);
            }); 
          }
     
      }
    
     
     
   
  
    
     
  

}

}
