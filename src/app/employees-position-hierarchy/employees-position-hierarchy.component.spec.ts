import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPositionHierarchyComponent } from './employees-position-hierarchy.component';

describe('EmployeesPositionHierarchyComponent', () => {
  let component: EmployeesPositionHierarchyComponent;
  let fixture: ComponentFixture<EmployeesPositionHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesPositionHierarchyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesPositionHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
