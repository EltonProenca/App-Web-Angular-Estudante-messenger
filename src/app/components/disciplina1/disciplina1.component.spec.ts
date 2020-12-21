import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Disciplina1Component } from './disciplina1.component';

describe('Disciplina1Component', () => {
  let component: Disciplina1Component;
  let fixture: ComponentFixture<Disciplina1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Disciplina1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Disciplina1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
