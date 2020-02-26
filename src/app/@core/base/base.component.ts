import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export enum DataLoadingState {
  Loading = 1,
  Loaded,
  Error,
}

export abstract class AbstractBaseComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected state: DataLoadingState;

  constructor() {}

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
}
