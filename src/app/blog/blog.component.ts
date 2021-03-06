import { defer } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  readonly originUrl = window.location.origin;
  readonly currentPost$ = defer(() => this.scullyRoutesService.getCurrent());
  @ViewChild('header', { static: true }) headerEl: ElementRef;
  @ViewChild('progress', { static: true }) progressEl: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    const progress = this.progressEl.nativeElement as HTMLElement;
    const header = this.headerEl.nativeElement as HTMLElement;

    /*Refresh scroll % width*/
    const scroll =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    progress.style.setProperty('--scroll', scroll + '%');

    /*Apply classes for slide in bar*/
    const scrollpos = window.scrollY;

    if (scrollpos > 100) {
      header.classList.remove('hidden');
      header.classList.remove('fadeOutUp');
      header.classList.add('slideInDown');
    } else {
      header.classList.remove('slideInDown');
      header.classList.add('fadeOutUp');
      header.classList.add('hidden');
    }
  }

  ngOnInit() {}

  constructor(private scullyRoutesService: ScullyRoutesService) {}
}
