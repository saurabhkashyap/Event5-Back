const EmailSystem = require('../lib/emailSystem');
const RemoteStore = require('../lib/remoteStore');

class EmailService {
  constructor() {
    this.remoteStore = new RemoteStore();
    this.emailSystem = new EmailSystem();
    this.table = 'registry-event';
    this.schedule = {
      emailData: {},
      emails: [],
      date: '',
      reschedule: false,
    };
  }

  async sendEmail(data, emails, personalized) {
    await this.emailSystem.sendEmail(data, emails, personalized);
    return true;
  }

  async scheduleEmail(data) {
    await this.emailSystem.scheduleEmail(data);
    return true;
  }

  async rescheduleEmail(data, reschedule = true) {
    await this.emailSystem.scheduleEmail(data, reschedule);
    return true;
  }
}

module.exports = EmailService;
