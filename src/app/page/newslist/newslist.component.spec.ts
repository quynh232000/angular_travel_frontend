import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslistComponent } from './newslist.component';

describe('NewslistComponent', () => {
  let component: NewslistComponent;
  let fixture: ComponentFixture<NewslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
