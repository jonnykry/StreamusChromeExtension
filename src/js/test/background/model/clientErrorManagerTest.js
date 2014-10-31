﻿define([
   'background/model/clientErrorManager'
], function (ClientErrorManager) {
    'use strict';

    describe('ClientErrorManager', function () {
        beforeEach(function () {
            this.clientErrorManager = new ClientErrorManager();
            this.reportedErrors = this.clientErrorManager.get('reportedErrors');
            sinon.stub(this.reportedErrors.model.prototype, 'sync');
        });

        afterEach(function () {
            this.reportedErrors.model.prototype.sync.restore();
        });

        it('should log an error message properly', function () {
            this.clientErrorManager._logError(new Error('test message'));

            expect(this.reportedErrors.length).to.equal(1);
        });

        it('should log not log the same error message more than once', function () {
            for (var i = 0; i < 5; i++) {
                this.clientErrorManager._logError(new Error('test message'));
            }

            expect(this.reportedErrors.length).to.equal(1);
        });
    });
});