import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuogoComponent } from './luogo.component';

describe('LuogoComponent', () => {
  let component: LuogoComponent;
  let fixture: ComponentFixture<LuogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuogoComponent]
    });
    fixture = TestBed.createComponent(LuogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
