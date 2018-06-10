import angular from 'angular';
import { SearchSrv } from 'app/core/services/search_srv';
export class MonitoringCtrl {
  navModel: any;
  query: any;
  sections: any;
  constructor(navModelSrv, private searchSrv: SearchSrv) {
    this.query = {
      query: '',
      mode: 'tree',
      tag: [],
      starred: false,
      skipRecent: true,
      skipStarred: true,
      folderIds: [],
    };
    this.navModel = navModelSrv.getNav('operation', 'monitoring');
    this.getList();
  }

  getList() {
    return this.searchSrv.search(this.query).then(result => {
      return this.initAllDashboards(result);
    });
  }

  initAllDashboards(result) {
    if (!result || result.length === 0) {
      this.sections = [];
    }
    this.sections = result[0].items;
  }
}
angular.module('grafana.controllers').controller('MonitoringCtrl', MonitoringCtrl);
