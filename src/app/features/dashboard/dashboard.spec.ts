import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { provideTranslateService } from '@ngx-translate/core';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { Dashboard } from './dashboard';

describe('Dashboard Component', () => {
  beforeAll(async () => {
    await resolveComponentResources(() => Promise.resolve(''));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideTranslateService()],
    }).compileComponents();
  });

  it('should create dashboard instance', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize monthly and category chart datasets', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const component = fixture.componentInstance;

    expect((component as any).monthlyData().labels.length).toBe(6);
    expect((component as any).categoryData().labels.length).toBe(4);
  });
});
