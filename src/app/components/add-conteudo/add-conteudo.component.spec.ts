import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConteudoComponent } from './add-conteudo.component';

describe('AddConteudoComponent', () => {
  let component: AddConteudoComponent;
  let fixture: ComponentFixture<AddConteudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConteudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
