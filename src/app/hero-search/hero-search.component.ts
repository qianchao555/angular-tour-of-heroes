import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})

export class HeroSearchComponent implements OnInit {
  // 将 heroes$ 声明为一个Observable
  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // 通过next方法,往Observable推送值.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 传出最终字符前，将会等待，直到新增字符串的事件暂停了300毫秒
     debounceTime(300),

      // 确保只有过滤条件变化时才发送请求
      distinctUntilChanged(),

      // 调用搜索服务，并且只保留最近的搜索可视察对象
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
