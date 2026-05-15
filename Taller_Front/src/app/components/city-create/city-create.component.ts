import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {
  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cityName = '';
  selectedCountryId: number | null = null;
  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  onSave(): void {
    const trimmedCityName = this.cityName.trim();

    if (!trimmedCityName || this.selectedCountryId === null) {
      return;
    }

    this.cityService.createCity(this.selectedCountryId, { name: trimmedCityName }).subscribe(() => {
      this.cityName = '';
      this.selectedCountryId = null;
      this.cityCreated.emit();
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
