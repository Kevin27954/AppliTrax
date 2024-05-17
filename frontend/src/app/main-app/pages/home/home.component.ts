import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InplaceModule } from 'primeng/inplace';
import { Observable, filter, first, map, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InplaceModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  number: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  number2: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

  value: number | undefined;

  constructor(private router: Router) {}

  testObservables(): Observable<number> {
    return this.number.pipe(map((num) => num * 10));
  }

  runObesrvable() {
    return this.testObservables().subscribe((num) => {
      this.value = num;
    });
  }

  runTwoObservables(): Observable<number> {
    // Returns the creation of a new Observable Stream which is the
    // result of the most inner map() function.
    return this.number.pipe(
      map((num) => num + 1),
      switchMap((num) =>
        this.number2.pipe(
          map((num2) => {
            return num2 + num;
          })
        )
      )
    );
  }

  runSubscription() {
    this.runObesrvable();
    console.log(this.value);
  }

  runSwitchMap() {
    this.runTwoObservables().subscribe((num) => console.log(num));
  }
}
