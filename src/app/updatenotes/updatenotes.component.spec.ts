import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenotesComponent } from './updatenotes.component';

describe('UpdatenotesComponent', () => {
  let component: UpdatenotesComponent;
  let fixture: ComponentFixture<UpdatenotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatenotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
