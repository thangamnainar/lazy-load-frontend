import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogFormComponent } from './dynamic-dialog-form.component';

describe('DynamicDialogFormComponent', () => {
  let component: DynamicDialogFormComponent;
  let fixture: ComponentFixture<DynamicDialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicDialogFormComponent]
    });
    fixture = TestBed.createComponent(DynamicDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
