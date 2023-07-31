import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-dialog-form',
  templateUrl: './dynamic-dialog-form.component.html',
  styleUrls: ['./dynamic-dialog-form.component.scss']
})
export class DynamicDialogFormComponent {
  dialogForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dialogForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add more form fields as needed
    });
  }

  // Submit form data
  onSubmit(): void {
    if (this.dialogForm.valid) {
      // Do something with the form data
      console.log(this.dialogForm.value);
    }
  }
}
