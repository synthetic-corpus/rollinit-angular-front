import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { HomeComponent } from './components/home/home.component';
import { TentsComponent } from './components/tents/tents.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { InitiativeListComponent } from './components/initiative-list/initiative-list.component';
import { NpcgroupComponent } from './components/encounters/npcgroup/npcgroup.component';
import { PlayercharacterComponent } from './components/tents/playercharacter/playercharacter.component';
import { NpcComponent } from './components/encounters/npc/npc.component';
import { NpcaddComponent } from './components/encounters/npcadd/npcadd.component';
import { NewencounterComponent } from './components/encounters/newencounter/newencounter.component';
import { TentGroupComponent } from './components/tents/tent-group/tent-group.component';
import { NewTentComponent } from './components/tents/newtent/newtent.component';
import { HelpComponent } from './components/help/help.component';
import { SupportComponent } from './components/support/support.component';
import { TumblerComponent } from './components/initiative-list/tumbler/tumbler.component';

@NgModule({
  declarations: [
    HelpComponent,
    AppComponent,
    NavBarComponent,
    StartPageComponent,
    HomeComponent,
    TentsComponent,
    EncountersComponent,
    InitiativeListComponent,
    NpcgroupComponent,
    PlayercharacterComponent,
    NpcComponent,
    NpcaddComponent,
    NewencounterComponent,
    TentGroupComponent,
    NewTentComponent,
    SupportComponent,
    TumblerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    MatSelectModule,
    AppRouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
