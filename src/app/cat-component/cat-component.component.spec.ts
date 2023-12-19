import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatComponentComponent } from './cat-component.component';

describe('CatComponentComponent', () => {
  let component: CatComponentComponent;
  let fixture: ComponentFixture<CatComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
