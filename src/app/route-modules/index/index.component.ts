import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleService } from 'src/app/root-components/header/common/title.service';
import { Pages } from 'src/app/root-components/navigation/common/pages.enum';

import { PageService } from './../../root-components/navigation/common/page.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {

  private readonly TITLE = 'Admin';

  constructor(
    private titleService: TitleService,
    private pageService: PageService,
    ) {
    this.titleService.setTitle(this.TITLE);
    this.setPage();
  }

  private setPage(): void {
    this.pageService.setPage(Pages.INDEX);
  }
}
