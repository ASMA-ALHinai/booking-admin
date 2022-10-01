import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysTimeComponent } from './working-days-time.component';

describe('WorkingDaysTimeComponent', () => {
  let component: WorkingDaysTimeComponent;
  let fixture: ComponentFixture<WorkingDaysTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingDaysTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingDaysTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
