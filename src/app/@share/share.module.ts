import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const BASE_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];
const PIPES = [];
const COMPONENTS = [];
const ENTRY_COMPONENTS = [];
const DIRECTIVES = [];
@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...PIPES, ...COMPONENTS, ...ENTRY_COMPONENTS, ...DIRECTIVES],
  declarations: [],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class ShareModule { }
