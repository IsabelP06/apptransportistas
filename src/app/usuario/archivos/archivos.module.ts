import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivosPageRoutingModule } from './archivos-routing.module';

import { ArchivosPage } from './archivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivosPageRoutingModule
  ],
  declarations: [ArchivosPage]
})
export class ArchivosPageModule {}
