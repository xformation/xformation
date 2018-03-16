import angular from 'angular';
import coreModule from '../../core/core_module';
import $ from 'jquery';
export class SynDashboardCtrl {
  applicationList: any[];
  bucketList: any[];
  navModel: any;
  bucketWidth: string;
  applicationWidth: string;
  constructor(navModelSrv, private $scope: any, private alertSrv) {
    this.navModel = navModelSrv.getNav('dashboards', 0);
    this.applicationList = this.getApplicationList();
    this.bucketList = this.getBucketList();
    this.bucketWidth = this.bucketList.length * 120 + 22 + 'px';
    this.applicationWidth = this.applicationList.length * 120 + 22 + 'px';
  }

  getApplicationList() {
    return [
      {
        name: 'CRM',
        class: 'public/img/apps/1.png',
        className: 'crm',
      },
      {
        name: 'Hospital Management System',
        class: 'public/img/apps/2.png',
        className: 'hsms',
      },
      {
        name: 'Hotel Management System',
        class: 'public/img/apps/3.png',
        className: 'htms',
      },
      {
        name: 'E-Commerse',
        class: 'public/img/apps/4.png',
        className: 'ec',
      },
      {
        name: 'Service Desk',
        class: 'public/img/apps/5.png',
        className: 'sd',
      },
    ];
  }

  getBucketList() {
    return [
      {
        name: 'AWS',
        class: 'public/img/buckets/aws.png',
        droppedApps: 0,
      },
      {
        name: 'AZURE',
        class: 'public/img/buckets/azu.png',
        droppedApps: 0,
      },
      {
        name: 'GCP',
        class: 'public/img/buckets/gcp.png',
        droppedApps: 0,
      },
    ];
  }

  handleDrop(app, bucket) {
    let bucketData = this.bucketList[bucket];
    if (bucketData) {
      bucketData.droppedApps += 1;
      let droppedApps = bucketData.droppedApps > 3 ? 3 : bucketData.droppedApps;
      bucketData.class = 'public/img/buckets/' + droppedApps + '.png';
      this.$scope.$apply();
      this.alertSrv.set('App Dropped', app + ' dropped in ' + bucketData.name, 'success', 4000);
    }
  }
}
angular.module('grafana.controllers').controller('SynDashboardCtrl', SynDashboardCtrl);

function draggable() {
  return function(scope, element) {
    var el = element[0];
    var $el = $(el);
    $el.draggable({
      revert: 'invalid', // when not dropped, the item will revert back to its initial position
      containment: 'document',
      helper: 'clone',
      cursor: 'move',
    });
  };
}

function droppable() {
  return {
    scope: {
      drop: '&',
    },
    link: function(scope, element) {
      var el = element[0];
      var $el = $(el);
      $el.droppable({
        accept: '.item-container',
        classes: {
          'ui-droppable-active': 'ui-state-highlight',
        },
        drop: function(event, ui) {
          let app = ui.draggable.attr('app-name');
          let bucketId = $el.attr('bucket-id');
          if (app) {
            scope.drop({
              app: app,
              bucket: bucketId,
            });
          }
        },
      });
    },
  };
}

coreModule.directive('draggable', draggable);
coreModule.directive('droppable', droppable);
