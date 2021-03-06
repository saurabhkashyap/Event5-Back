const assert = require('assert');
const proxyquire = require('proxyquire');
const config = require('../../config/config');

const {
  OrganizationServiceMock,
  organizationMock,
} = require('../../utils/mocks/organizationMock');
const testServer = require('../../utils/testServer');

const token = config.tests.token;

describe('- Organization Route', function () {
  const route = proxyquire('../../routes/organization', {
    '../services/organization': OrganizationServiceMock,
  });

  const request = testServer(route);

  // Test
  describe('POST /api/organization', function () {
    it('Should create an organization', function () {
      return request
        .post('/api/organization')
        .set('Authorization', 'bearer ' + token)
        .send(organizationMock[0])
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: organizationMock[0],
            message: 'organization created',
          });
        });
    });
    it('Should update an organization', function () {
      return request
        .put('/api/organization')
        .set('Authorization', 'bearer ' + token)
        .send(organizationMock[0])
        .set('Accept', 'application/json')
        .expect(200)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: organizationMock[0],
            message: 'organization updated successfully',
          });
        });
    });
  });
});
