import { Component, OnInit } from '@angular/core';
import { CatApiService } from './api.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class CatComponent implements OnInit {
  breeds: any[] = [];
  selectedBreedId: string = '';
  catInfoMarkup: string = '';
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private catApiService: CatApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.catApiService.fetchBreeds().subscribe(
      (data: any[]) => {
        this.breeds = data.map((breed) => ({
          text: breed.name,
          value: breed.id,
        }));
        this.isLoading = false;
      },
      (error) => {
        this.onError();
      }
    );
  }

  onChooseCatBreed(event: any): void {
    this.catInfoMarkup = '';
    this.isLoading = true;
    this.selectedBreedId = event.currentTarget.value;

    this.catApiService.fetchCatByBreed(this.selectedBreedId).subscribe(
      (data: any[]) => {
        this.catInfoMarkup = this.createMarkup(data);
        this.isLoading = false;
      },
      (error) => {
        this.onError();
      }
    );
  }

  createMarkup(cats: any[]): string {
    return cats
      .map(({ url, breeds }) => {
        const { name, origin, temperament, description, weight } = breeds[0];
        const markup = `
    <div class="cat-description">
      <img src="${url}" alt="${name}" width="460">
      <div class="cat-text">
        <h2>${name}</h2>
        <h3>Origin</h3>
        <p>${origin}</p>
        <h3>Weight</h3>
        <p>${weight.metric} kg</p>        
        <h3>Temperament</h3>
        <p>${temperament}</p>
        <h3>Description</h3>
        <p>${description}</p>        
      </div>
    </div> `;
        return markup;
      })
      .join('');
  }

  onError(): void {
    refs.loader.classList.remove('is-hidden');
    refs.breedSelect.classList.add('is-hidden');
    refs.textLoader.classList.add('is-hidden');

    Notiflix.Notify.failure(refs.ifError.textContent, {
      position: 'center-top',
      timeout: 5000,
      width: '520px',
      fontSize: '20px',
      cssAnimationStyle: 'from-top',
    });
  }
}
