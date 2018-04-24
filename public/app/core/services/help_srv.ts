import coreModule from 'app/core/core_module';

export class HelpSrv {
  helpObj: any;
  currentIndex: 0;
  showHelp: boolean;
  constructor(private $rootScope) {
    this.helpObj = [
      {
        id: '#create-bucket-container',
        text: 'Create a bucket that will contain apps',
        isFirst: true,
      },
      {
        id: '#create-bucket',
        text: 'Create a bucket by clicking here',
      },
      {
        id: '#drag-drop-container',
        text: 'Bucket and Application list',
      },
      {
        id: '#app-container',
        text: 'List of Application, Draggable. Drop to Buckets',
      },
      {
        id: '#bucket-container',
        text: 'List of buckets. Drop application to bucket',
        isLast: true,
      },
    ];
    this.currentIndex = 0;
    if (sessionStorage.getItem('is-help-shown')) {
      this.showHelp = false;
    } else {
      this.showHelp = true;
      sessionStorage.setItem('is-help-shown', '1');
    }
  }
  showNextTip() {
    this.currentIndex += 1;
    this.showTip(this.currentIndex);
  }
  showPrevTip() {
    this.currentIndex -= 1;
    this.showTip(this.currentIndex);
  }
  showTip(index) {
    this.$rootScope.$emit('show-help', this.helpObj[index]);
  }
  closeTooltip() {
    this.currentIndex = 0;
    this.showHelp = false;
  }
  getCurrentHelpObj() {
    return this.helpObj[this.currentIndex];
  }
}

coreModule.service('helpSrv', HelpSrv);
