import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNavigationComponent } from './sidenav-navigation.component';

describe('SidenavNavigationComponent', () => {
  let component: SidenavNavigationComponent;
  let fixture: ComponentFixture<SidenavNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
