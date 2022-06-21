import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioControlerComponent } from './usuario-controler.component';

describe('UsuarioControlerComponent', () => {
  let component: UsuarioControlerComponent;
  let fixture: ComponentFixture<UsuarioControlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioControlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioControlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
