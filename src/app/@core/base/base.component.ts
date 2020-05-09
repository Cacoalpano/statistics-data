import { Component, OnInit, OnDestroy, Injector, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, ValidationErrors, FormGroup, AbstractControlOptions } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../services/common/authentication.service';
import { MessageService } from '../services/common/message.service';
import { LoadingService } from '../services/common/loading.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

export enum DataLoadingState {
  Loading = 1,
  Loaded,
  Error,
}

export abstract class AbstractBaseComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected state: DataLoadingState;
  protected translateService: TranslateService;
  protected formBuilder: FormBuilder;
  protected activatedRoute: ActivatedRoute;
  protected authenticationService: AuthenticationService;
  protected messageService: MessageService;
  protected loadingService: LoadingService;
  protected router: Router;
  protected toastr: ToastrService;
  protected bsModalService: BsModalService;
  protected keepMessageOndestroy = false;
  protected bsModalRef: BsModalRef;

  constructor(protected injector: Injector) {
    this.translateService = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.authenticationService = this.injector.get(AuthenticationService);
    this.router = this.injector.get(Router);
    this.messageService = this.injector.get(MessageService);
    this.loadingService = this.injector.get(LoadingService);
    this.toastr = this.injector.get(ToastrService);
    this.bsModalService = this.injector.get(BsModalService);
    this.loadingService.hide();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  isDataLoaded(): boolean {
    return this.state === DataLoadingState.Loaded;
  }
  isDataLoading(): boolean {
    return this.state === DataLoadingState.Loading;
  }
  isDataLoadedError(): boolean {
    return this.state === DataLoadingState.Error;
  }
  setDataLoadingState(state: DataLoadingState) {
    this.state = state;
  }
  rxSubscribe(observable: Observable<any>, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    const subscription: Subscription = observable.subscribe(next, error, complete);
    this.subscriptions.push(subscription);

    return subscription;
  }

  rxUnsubscribe(subscription: Subscription) {
    this.subscriptions = _.reject(this.subscriptions, (s: Subscription) => s === subscription);
    subscription.unsubscribe();
  }

  rxUnsubscribeAll() {
    _.each(this.subscriptions, (subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  protected createForms(
    controlsConfig: {
      [key: string]: any;
    },
    options?:
      | AbstractControlOptions
      | {
          [key: string]: any;
        }
      | null,
  ) {
    return this.formBuilder.group(controlsConfig, options);
  }

  scrollToFirstError(form: ElementRef<HTMLElement>): void {
    if (form) {
      setTimeout(() => {
        const firstElementWithError = form.nativeElement.querySelector('.has-error');
        if (firstElementWithError) {
          firstElementWithError.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  updateFormValueAndValidity(form: FormGroup) {
    if (form && form.controls) {
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].updateValueAndValidity();
      });
      form.updateValueAndValidity();
    }
  }

  getChildObject(object: any, key: string, additional?: { [key: string]: any }) {
    if (typeof object === 'object') {
      return { ...object[key], ...additional };
    }

    return null;
  }

  logFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(`Key control: ${key}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`);
        });
      }
    });
  }

  async navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  getValueFromKeyTranslate(key: string): string {
    let value: string = null;
    this.translateService.get(key).subscribe((resp) => {
      value = resp;
    });
    return value;
  }
}
