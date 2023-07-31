import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[customTwoWayBinding]'
})
export class CustomTwoWayBindingDirective {
  @Input('customTwoWayBinding') value: any;
  @Output('customTwoWayBindingChange') valueChange: EventEmitter<any> = new EventEmitter();
  @Output() customTwoWayBindingError: EventEmitter<string> = new EventEmitter();

  @HostListener('input', ['$event.target.files']) onInput(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files.item(0);
      if (file && this.isValidFileType(file) && this.isValidFileSize(file)) {
        this.value = file;
        this.valueChange.emit(this.value);
      } else {
        // If the file is not valid, reset the input value to clear the selection
        this.value = null;
        this.valueChange.emit(this.value);
        const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = '';
        }

        // Emit the error message
        const errorMessage = 'Invalid file selection. Please choose a valid image file (JPEG, JPG, PNG) within 100MB.';
        this.customTwoWayBindingError.emit(errorMessage);
      }
    }
  }

  private isValidFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
  }

  private isValidFileSize(file: File): boolean {
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    return file.size <= maxSize;
  }
}
