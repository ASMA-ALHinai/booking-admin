import { Component, OnInit } from '@angular/core';
import { BookingService } from "../../shared/service/booking.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-working-days-time',
  templateUrl: './working-days-time.component.html',
  styleUrls: ['./working-days-time.component.scss']
})
export class WorkingDaysTimeComponent implements OnInit {
  isWoringDayLoading = false;
  isConfirmLoading: boolean = false;
  WoringDayList = [];
  list: any[] = [];
  time: Date;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  selectedValue = 'lucy';
  listOfDay = [];
TimeChecked : string[] = [];
  listOfTime =[
     {
      id: 1,
      time:  "16:00:00",
      checked: false,
    },
    {
      id: 2,
      time: "17:00:00",
      checked: false,
    },
    {
      id: 3,
      time: "18:00:00",
      checked: false,
    },
    {
      id: 4,
      time: "19:00:00",
      checked: false,
    },
    {
      id: 5,
      time: "20:00:00",
      checked: false,
    },
    {
      id: 6,
      time: "21:00:00",
      checked: false,
    },
    {
      id: 7,
      time: "22:00:00",
      checked: false,
    },
    {
      id: 8,
      time: "23:00:00",
      checked: false,
    },
    {
      id: 9,
      time:  "00:00:00",
      checked: false,
    }
  ];
  constructor(public bookingService: BookingService,
    private message: NzMessageService) { }

  ngOnInit(): void {
  

    this.getWorkingDays();
  }

  isAddTimeVisible = false;

  isAddDayTimeVisible = false;

  showAddTimeModal(id: any): void {
    this.DayId = id;
    this.isAddTimeVisible = true;
  }

  handleAddTimeOk(): void {
    this.isAddTimeVisible = false;
  }

  handleAddTimeCancel(): void {
    this.isAddTimeVisible = false;
  }


  showAddDayTimeModal(): void {
    this.isAddDayTimeVisible = true;
  }

  handleAddDayTimeOk(): void {
    this.isAddDayTimeVisible = false;
  }

  handleAddDayTimeCancel(): void {
    this.isAddDayTimeVisible = false;
  }



  async getWorkingDays() {
    this.isWoringDayLoading = true;
    let params = {
      pageSize: 2,
      page: 1
    }
    this.bookingService.getWorkingDays(params).subscribe({
      next: (response: any) => {
        this.WoringDayList = response?.data;
        this.isWoringDayLoading = false;
        const result = this.WoringDayList.filter((obj) => {
          return obj['is_added'] === false;
        });
        this.listOfDay = result;
      },
      error: (error) => {
        this.isWoringDayLoading = false;
      }
    }
    );

  }



  async deleteDays(id:any) {
    this.isWoringDayLoading = true;
    this.bookingService.DeleteWorkingDays(id).subscribe({
      next: (response: any) => {
   
        this.TimeChecked =[];
        this.isWoringDayLoading = false;
        this.getWorkingDays();
      },
      error: (error) => {
        this.isWoringDayLoading = false;
      }
    }
    );

  }


  addDayAndTime() {
    let params = {
      "payload": [
        {
            "number" : parseFloat(this.selectedValue),
            "times" :  this.TimeChecked,
        }
    ]
  }
    this.bookingService.addDateTime(params).subscribe({
      next: (response: any) => {
        this.isWoringDayLoading = false;
        this.getWorkingDays();
        this.TimeChecked =[];
        this.message.success(response.description, {
          nzDuration: 3000,
          nzAnimate: true,
        });
      },
      error: (error) => {
        this.isWoringDayLoading = false;
        this.isAddDayTimeVisible = false;
        this.message.error(error.error.description, {
          nzDuration: 3000,
          nzAnimate: true,
        });
      }
    })
  }
  

  DayId: number;
  addTimeToDay() {

    var Hours = (this.time.getHours() < 10 ? '0' : '') + this.time.getHours();
    var Minutes = (this.time.getMinutes() < 10 ? '0' : '') + this.time.getMinutes();
    var Seconds = (this.time.getSeconds() < 10 ? '0' : '') + this.time.getSeconds();
    var time = Hours + ":" + Minutes + ":" + Seconds;
    let params = {
      "working_day": this.DayId,
      "time": time.toString(),
    }
    this.bookingService.addTimeToDay(params).subscribe({
      next: (response: any) => {
        this.isWoringDayLoading = false;
        this.getWorkingDays();
        this.message.success(response.description, {
          nzDuration: 3000,
          nzAnimate: true,
        });
        this.isAddTimeVisible = false;
      },
      error: (error) => {
        this.isWoringDayLoading = false;
        this.isAddTimeVisible = false;
        this.message.error(error.error.description, {
          nzDuration: 3000,
          nzAnimate: true,
        });
      }
    }
    );

    
  }


  changeCheckbox(listOfTime:any) {
    if (listOfTime.checked)
    this.TimeChecked.push(listOfTime.time);
  else
    this.removeVal(this.TimeChecked, listOfTime.time);
  }






  removeVal(arr:any, val:any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val)
        arr.splice(i, 1);
    }
  }



}
