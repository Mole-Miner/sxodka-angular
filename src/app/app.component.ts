import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private readonly _trasnlateService: TranslateService) {}

  ngOnInit(): void {
    this._trasnlateService.setDefaultLang('ua');
  }
}
