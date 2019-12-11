import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule, MatTableModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { HomeWeatherComponent } from './home/home-weather/home-weather.component';
import { UsersComponent } from './users/users.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersDialogComponent } from './users/users-dialog/users-dialog.component';
import { GlobalService } from './global.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeWeatherComponent,
    UsersComponent,
    UsersDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    ChartsModule,
    InfiniteScrollModule,
  ],
  entryComponents: [
    UsersDialogComponent
  ],
  providers: [AuthService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
