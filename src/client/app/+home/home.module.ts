import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { PostsComponent } from '../shared/components';
import { MediaComponent } from '../shared/components';

import { MapToIterable } from '../shared/pipes';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent,
                 MapToIterable,
                 PostsComponent,
                 MediaComponent
                ],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
