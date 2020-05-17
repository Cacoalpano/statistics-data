import { Component, OnInit, Injector } from '@angular/core';
import { LoadingData } from 'src/app/@core/models/load-data.model';
import { AbstractBaseComponent } from 'src/app/@core/base/base.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent extends AbstractBaseComponent implements OnInit {
  show: boolean;
  data: LoadingData;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.rxSubscribe(this.loadingService.loadingObserable, (data: LoadingData) => {
      if (data) {
        this.show = !!data.show;
        this.data = data;
      } else {
        this.show = false;
        this.data = null;
      }
    });
  }

}
