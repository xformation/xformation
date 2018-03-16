import angular from 'angular';

export class CreateBucketCtrl {
  navModel: any;
  bucketName = '';
  bucketTypes = [
    {
      id: 0,
      name: 'AWS',
    },
    {
      id: 1,
      name: 'AZURE',
    },
    {
      id: 2,
      name: 'GOOGLE',
    },
    {
      id: 3,
      name: 'OVS',
    },
  ];
  currentType: any;
  orchestratorDetails: any[] = ['ECS', 'Kubernetes', 'DCOS', 'SWARM'];
  orchestratorDetail: any;
  authProviders: any[] = ['Access & secret key', 'Credentials file', 'ARN'];
  defaultRegions: any[] = [
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-south-1',
    'ca-central-1',
    'cn-north-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'sa-east-1',
    'us-east-1',
    'us-east-2',
    'us-gov-west-1',
    'us-west-1',
    'us-west-2',
  ];
  constructor(navModelSrv) {
    this.navModel = navModelSrv.getNav('dashboards', 0);
    this.currentType = this.bucketTypes[0];
  }

  onChangeBucketType() {}

  saveChanges() {}
}

angular.module('grafana.controllers').controller('CreateBucketCtrl', CreateBucketCtrl);
