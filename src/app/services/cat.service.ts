import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cat } from '../interfaces/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private cats: Cat[] = [
    {
      id: '1',
      name: 'Барсик',
      tags: ['Игривый', 'Ласковый'],
      imageUrl: 'assets/images/cats/cat1.jpg',
      isFavorite: false,
      description: 'Очень дружелюбный кот'
    },
    {
      id: '2',
      name: 'Мурзик',
      tags: ['Спокойный', 'Нежный'],
      imageUrl: 'assets/images/cats/cat2.jpg',
      isFavorite: false,
      description: 'Любит спать на солнышке'
    },
    {
      id: '3',
      name: 'Василий',
      tags: ['Умный', 'Любопытный'],
      imageUrl: 'assets/images/cats/cat3.jpg',
      isFavorite: false,
      description: 'Всегда исследует новые места'
    },
    {
      id: '4',
      name: 'Снежок',
      tags: ['Белый', 'Пушистый'],
      imageUrl: 'assets/images/cats/cat4.jpg',
      isFavorite: false,
      description: 'Белоснежный красавец'
    },
    {
      id: '5',
      name: 'Рыжик',
      tags: ['Энергичный', 'Веселый'],
      imageUrl: 'assets/images/cats/cat5.jpg',
      isFavorite: false,
      description: 'Оранжевый комок энергии'
    },
    {
      id: '6',
      name: 'Персик',
      tags: ['Милый', 'Домашний'],
      imageUrl: 'assets/images/cats/cat6.jpg',
      isFavorite: false,
      description: 'Любит нежиться на диване'
    },
    {
      id: '7',
      name: 'Граф',
      tags: ['Благородный', 'Строгий'],
      imageUrl: 'assets/images/cats/cat7.jpg',
      isFavorite: false,
      description: 'Ведет себя как настоящий аристократ'
    },
    {
      id: '8',
      name: 'Луна',
      tags: ['Тихий', 'Загадочный'],
      imageUrl: 'assets/images/cats/cat8.jpg',
      isFavorite: false,
      description: 'Активен преимущественно ночью'
    },
    {
      id: '9',
      name: 'Зефир',
      tags: ['Мягкий', 'Воздушный'],
      imageUrl: 'assets/images/cats/cat9.jpg',
      isFavorite: false,
      description: 'Невероятно пушистый кот'
    },
    {
      id: '10',
      name: 'Шерлок',
      tags: ['Наблюдательный', 'Внимательный'],
      imageUrl: 'assets/images/cats/cat10.jpg',
      isFavorite: false,
      description: 'Всегда за всем наблюдает'
    },
    {
      id: '11',
      name: 'Оскар',
      tags: ['Театральный', 'Выразительный'],
      imageUrl: 'assets/images/cats/cat11.jpg',
      isFavorite: false,
      description: 'Обладает выразительными глазами'
    },
    {
      id: '12',
      name: 'Багира',
      tags: ['Черный', 'Грациозный'],
      imageUrl: 'assets/images/cats/cat12.jpg',
      isFavorite: false,
      description: 'Черная пантера в миниатюре'
    },
    {
      id: '13',
      name: 'Симба',
      tags: ['Храбрый', 'Лидер'],
      imageUrl: 'assets/images/cats/cat13.jpg',
      isFavorite: false,
      description: 'Король дивана'
    },
    {
      id: '14',
      name: 'Клеопатра',
      tags: ['Королевская', 'Изящная'],
      imageUrl: 'assets/images/cats/cat14.jpg',
      isFavorite: false,
      description: 'Ведет себя как царица'
    },
    {
      id: '15',
      name: 'Феликс',
      tags: ['Удачливый', 'Оптимистичный'],
      imageUrl: 'assets/images/cats/cat15.jpg',
      isFavorite: false,
      description: 'Всегда попадает в удачные ситуации'
    },
    {
      id: '16',
      name: 'Гарфилд',
      tags: ['Ленивый', 'Любитель еды'],
      imageUrl: 'assets/images/cats/cat16.jpg',
      isFavorite: false,
      description: 'Обожает лазанью и поспать'
    }
  ];

  private catsSubject = new BehaviorSubject<Cat[]>(this.cats);
  cats$ = this.catsSubject.asObservable();

  getCats(): Cat[] {
    return this.cats;
  }

  toggleFavorite(catId: string): void {
    const index = this.cats.findIndex(cat => cat.id === catId);
    if (index !== -1) {
      this.cats[index].isFavorite = !this.cats[index].isFavorite;
      this.catsSubject.next([...this.cats]);
    }
  }

  getFavorites(): Cat[] {
    return this.cats.filter(cat => cat.isFavorite);
  }

  filterCats(search: string, tag: string | null): Cat[] {
    return this.cats.filter(cat => {
      const matchesSearch = search ? 
        cat.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesTag = tag ? 
        cat.tags.includes(tag) : true;
      return matchesSearch && matchesTag;
    });
  }

  getAllTags(): string[] {
    const allTags = this.cats.flatMap(cat => cat.tags);
    return [...new Set(allTags)];
  }
}