import angular from 'angular';
export class MonitoringCtrl {
  applicationList: any[];
  bucketList: any[];
  navModel: any;
  bucketWidth: string;
  applicationWidth: string;
  helpService: any;
  helpObj: any;
  constructor(navModelSrv) {
    this.navModel = navModelSrv.getNav('monitoring', 0);
  }
}
angular.module('grafana.controllers').controller('MonitoringCtrl', MonitoringCtrl);
