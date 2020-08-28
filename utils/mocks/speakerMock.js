const speakerMock = [
  {
    name: 'Ramon',
    biography: 'Ramon is google developer expert',
    role: 'Angular expert',
    twitter: '@ramon',
    photo_url: 'http://image.com/photo_ramon',
    schedule_id: 1,
  },
];

class SpeakerServiceMock {
  constructor() {}

  async getSpeaker() {
    return Promise.resolve(speakerMock);
  }

  async createSpeaker() {
    return Promise.resolve(speakerMock[0]);
  }
}

module.exports = {
  SpeakerServiceMock,
  speakerMock,
};
