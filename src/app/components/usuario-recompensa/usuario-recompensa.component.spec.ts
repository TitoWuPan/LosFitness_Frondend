import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecompensaComponent } from './usuario-recompensa.component';

describe('UsuarioRecompensaComponent', () => {
  let component: UsuarioRecompensaComponent;
  let fixture: ComponentFixture<UsuarioRecompensaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRecompensaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
