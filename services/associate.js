const RemoteStore = require('../lib/remoteStore');

class AssociateService {
  constructor() {
    this.remoteStore = new RemoteStore();
    this.table = 'associate';
  }

  async createAssociate(associate) {
    const createdAssociate = await this.remoteStore.create(
      this.table,
      associate
    );
    return createdAssociate;
  }

  async updateAssociate(associate) {
    this.table = 'associate-detail';
    const createdAssociate = await this.remoteStore.update(
      this.table,
      associate
    );
    return createdAssociate;
  }
}

module.exports = AssociateService;
