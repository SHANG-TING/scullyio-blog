import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Post } from './data/models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	blogTitle = 'Scullyio Blog';

	private destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.scullyRoutesService
      .getCurrent()
      .pipe(
        map((post) => post as Post),
        takeUntil(this.destroy$)
      )
      .subscribe((post) => {
        const postTitle = post ? post.title : 'Scullyio Blog';
        this.title.setTitle(postTitle);
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
