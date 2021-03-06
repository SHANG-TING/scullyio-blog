import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  blogTitle = 'Scullyio Blog';

  private destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.scullyRoutesService
      .getCurrent()
      .pipe(
        filter((post) => !!post),
        takeUntil(this.destroy$)
      )
      .subscribe((post) => {
        this.title.setTitle(post.title);
        // this.meta.updateTag({}, '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private title: Title,
    private meta: Meta,
    private scullyRoutesService: ScullyRoutesService
  ) {}
}
