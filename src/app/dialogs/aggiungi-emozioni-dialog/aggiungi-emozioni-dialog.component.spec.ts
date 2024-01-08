import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiEmozioniDialogComponent } from './aggiungi-emozioni-dialog.component';

describe('AggiungiEmozioniDialogComponent', () => {
  let component: AggiungiEmozioniDialogComponent;
  let fixture: ComponentFixture<AggiungiEmozioniDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiEmozioniDialogComponent]
    });
    fixture = TestBed.createComponent(AggiungiEmozioniDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
