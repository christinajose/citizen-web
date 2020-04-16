import { Component, OnInit } from "@angular/core";
import CountriesData from "../../../assets/countries.json";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppService } from "src/app/services/app.service.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent implements OnInit {
  Countries = CountriesData;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginSubmitted = false;
  registerSubmited = false;

  constructor(private appService: AppService, private router: Router) {
    this.loginForm = new FormGroup({
      nameEmail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.signupForm = new FormGroup({
      nameEmail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  get registerFormControl() {
    return this.signupForm.controls;
  }

  ngOnInit() {}

  login() {
    console.log(this.loginForm.value);
    this.loginSubmitted = true;
    if (this.loginForm.valid) {
      this.appService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.status == "success") {
          this.router.navigate(["/select-feature"]);
        } else {
          this.loginForm
            .get("password")
            .setErrors({ invalidCredentials: true });
          setTimeout(() => {
            this.loginForm.get("password").setErrors(null);
          }, 2000);
        }
      });
    }
  }

  register() {
    console.log(this.signupForm.value);
    this.registerSubmited = true;
    if (this.signupForm.valid) {
      this.appService.register(this.signupForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.status == "success") {
          this.router.navigate(["/select-feature"]);
        } else {
          this.signupForm.get("nameEmail").setErrors({ invalidName: true });
          setTimeout(() => {
            this.signupForm.get("nameEmail").setErrors(null);
          }, 2000);
        }
      });
    }
  }
}
