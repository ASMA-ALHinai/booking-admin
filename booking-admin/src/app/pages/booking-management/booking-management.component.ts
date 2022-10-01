import { Component, OnInit } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { BookingService } from "../../shared/service/booking.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss']
})
export class BookingManagementComponent implements OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Booking',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  appointmentsList = [];
  isAppointmentsLisLoading: boolean = false;
  appointmentStatus: string = "1";
  paymentStatus: string = "1";

  isAppointmentStatusVisible = false;
  isPaymentStatusVisible = false;
  AppoId:any;

  showAppointmentStatusModal(id: any , appointmentStatus: any): void {
    this.AppoId = id;
    this.appointmentStatus= appointmentStatus;
    this.isAppointmentStatusVisible = true;
  }

  handleAppointmentStatusOk(): void {
    this.isAppointmentStatusVisible = false;
  }

  handleAppointmentStatusCancel(): void {
    this.isAppointmentStatusVisible = false;
  }


  showPaymentStatusModal(id: any , paymentStatus: any): void {
    this.AppoId = id;
    this.paymentStatus= paymentStatus;
    this.isPaymentStatusVisible = true;
  }

  handlePaymentStatusOk(): void {
    this.isPaymentStatusVisible = false;
  }

  handlePaymentStatusCancel(): void {
    this.isPaymentStatusVisible = false;
  }


  constructor(public bookingService: BookingService,
    private message: NzMessageService

  ) {

  }


  changeAppointmentStatus(ev: any) {
    this.appointmentStatus = ev;

  }

  changePaymentStatus(ev: any) {
    this.paymentStatus = ev;

  }


  ngOnInit(): void {
    this.getAllappointments();
    // this.rows = [
    //   { description: 'Avg. Client Rating' },
    //   { description: 'Instagram Followers' },
    //   { description: 'Google Ads CPC' },
    // ];

  }

  async getAllappointments() {
    this.isAppointmentsLisLoading = true;
    let params = {
      pageSize: 2,
      page: 1
    }
    this.bookingService.getAllappointments(params).subscribe({
      next: (response: any) => {
        this.appointmentsList = response?.data;
        this.isAppointmentsLisLoading = false;
      },
      error: (error) => {
        this.isAppointmentsLisLoading = false;
      }
    }
    );

  }




  updatePaymentStatus() {
    let params: any;
    params = {
      "appointment_id":this.AppoId,
      "status":  this.paymentStatus = "1" ? "2" : "1",

    }
    this.bookingService.changePaymentStatus(params).subscribe(
      (res: any) => {
        this.message.success(res.message);
        this.getAllappointments();
      },
      (err) => {
        this.message.error(err.message);
      }
    );

  }


  async updateAppointmentStatus() {
    let params = {
      "appointment_id": this.AppoId,
      "status":this.appointmentStatus = "1" ? "2" : "1",
    }
    this.bookingService.ChangeAppointmentStatus(params).subscribe(
      (res: any) => {
        this.message.success(res.message);
        this.getAllappointments();
      },
      (err) => {
        this.message.error(err.message);
      }
    );

  }

  deleteAppointments(id: any) {
    this.bookingService.DeleteAppointments(id).subscribe(
      (res: any) => {
        this.getAllappointments()
        this.message.success(res.message);
      }, err => {
        this.message.success(err.error.description, {
          nzDuration: 3000,
          nzAnimate: true,
        });
      }
    );
  }


}
