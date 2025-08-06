import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-dong-gop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dong-gop.component.html',
  styleUrl: './dong-gop.component.css'
})
export class DongGopComponent implements OnInit {
  contributionForm!: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contributionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      contributionType: ['', [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      // agreement: [false, [Validators.requiredTrue]]
    });
  }

  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files.filter(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" quá lớn. Vui lòng chọn file nhỏ hơn 10MB.`);
        return false;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File "${file.name}" không được hỗ trợ. Vui lòng chọn file PDF, DOC, DOCX, TXT, JPG, PNG hoặc GIF.`);
        return false;
      }
      
      return true;
    });
  }

  onSubmit(): void {
    if (this.contributionForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Show success modal
      const modal = new bootstrap.Modal(document.getElementById('successModal'));
      modal.show();
      
      // Reset form
      this.contributionForm.reset();
      this.selectedFiles = [];
      
      // Reset file input
      const fileInput = document.getElementById('files') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    }, 2000);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contributionForm.controls).forEach(key => {
      const control = this.contributionForm.get(key);
      control?.markAsTouched();
    });
  }
}