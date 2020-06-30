import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
// import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  // heroes = HEROES;
  // selectedHero: Hero;
  heroes: Hero[];


  // private messageService: MessageService
  constructor(private heroService: HeroService) { }

  ngOnInit(){
    this.getHeroes();
  }

  /**
   * click事件触发的方法
   * @param hero
   */
  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroService:Selected hero id=${hero.id}`);
  // }

  /**
   * 从服务中获取英雄数据
   */
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
