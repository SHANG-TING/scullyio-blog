import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { defer } from 'rxjs';
import { filter, map, switchMap, tap, toArray } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	posts$ = defer(() => this.scullyRoutesService.allRoutes$).pipe(
		map((posts) => posts.filter((post) => post?.published))
	);

	constructor(private scullyRoutesService: ScullyRoutesService) {}

	ngOnInit(): void {}
}
