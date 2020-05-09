import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  BsDropdownModule.forRoot(),
  CollapseModule.forRoot(),
  NgSelectModule,
  ToastrModule.forRoot(),
  ModalModule.forRoot(),
  NgxPaginationModule,
];
const PIPES = [];
const COMPONENTS = [];
const ENTRY_COMPONENTS = [];
const DIRECTIVES = [];
@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...PIPES, ...COMPONENTS, ...ENTRY_COMPONENTS, ...DIRECTIVES],
  declarations: [],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ShareModule {}
