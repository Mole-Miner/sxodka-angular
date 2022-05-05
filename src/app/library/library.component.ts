import { Select, Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { LibraryState } from './library.state';
import { LibraryAction } from './library.action';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  @Select(LibraryState.items)
  readonly items$!: Observable<any[]>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LibraryAction.FindAll());
  }
}
