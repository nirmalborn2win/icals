import { Component } from '@angular/core';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'app';
  public icalendar: string[];
  formatIcsText(str, maxLength) {
    if (!str) {
      return '';
    }
    str = str.replace(/\n/g, '\\n');
    str = str.substring(0, maxLength);

    return str;
  }

  calendar() {
    const data = {
      startDate: '2017-11-11T12:00:00',
      endDate: '2017-11-11T12:30:00',
      title: 'ios 11 test',
      location: 'At your Home',
      className: 'btn btn-sm btn-default dropdown-toggle',
      description: 'can u add in your icalendar?'
    };
    const calendarUrl = {

      icalendar: this.getIcsCalendar(data),

    };
    const fileName = this.getIcsFileName(this.title),
      icsData = calendarUrl.icalendar,
      icsBlob = this.getIcsBlob(icsData);
    saveAs(icsBlob, fileName);
  }

  getIcsBlob(icsData) {
    return new Blob([ icsData ], {
      type: 'text/calendar'
    });
  }

  getIcsFileName(title) {
    if (!title) {
      return 'event.ics';
    }
    return `${title.replace(/[^\w ]+/g, '')}.ics`;
  }
  getUid() {
    return Math.random().toString(36).substr(2);
  }
  getTimeCreated() {
    return moment().format('YYYYMMDDTHHmmss');
  }
  getIcsCalendar(data) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DESCRIPTION:' + this.formatIcsText(data.description, 62),
      'DTSTART:' + data.startDate,
      'DTEND:' + data.endDate,
      'LOCATION:' + this.formatIcsText(data.location, 64),
      'SUMMARY:' + this.formatIcsText(data.title, 66),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR',
      'UID:' + this.getUid(),
      'DTSTAMP:' + this.getTimeCreated(),
      'PRODID:angular-addtocalendar'
    ].join('\n');
  }

}
