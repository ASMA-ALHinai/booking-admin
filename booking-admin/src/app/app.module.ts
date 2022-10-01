import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { BookingService } from './shared/service/booking.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeAPIService } from './_fake/fake-api.service';
import { BookingManagementComponent } from './pages/booking-management/booking-management.component';
// #fake-end#
import { HeadersInterceptor } from 'src/app/shared/interceptor/headers.interceptor';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { WorkingDaysTimeComponent } from './pages/working-days-time/working-days-time.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MbscModule, MbscProvider } from "ack-angular-mobiscroll";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
registerLocaleData(en);


function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, BookingManagementComponent, WorkingDaysTimeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzModalModule,
    MbscModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    NzMessageModule,
    NzRadioModule,
    NzPopconfirmModule,
    NzTableModule,
    NzFormModule,
    NzTimePickerModule,
    NzSpinModule,
    NzButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NzSelectModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    FormsModule,
  ],
  providers: [   {provide: HTTP_INTERCEPTORS, useClass:HeadersInterceptor, multi: true}, { provide: NZ_I18N, useValue: en_US },],
  bootstrap: [AppComponent],
})
export class AppModule {}
