import { Component, OnInit } from '@angular/core';
import { CodePush, ILocalPackage } from '@ionic-native/code-push/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public codePush: CodePush, public platform: Platform) {
  }
  ngOnInit(): void {
  }

  checkUpdate() {
    let key = '';
    if (this.platform.is('ios')) {
      // TODO: replace this
      key = 'xxx';
    } else {
      // TODO: replace this
      key = 'xxx';
    }
    this.codePush.checkForUpdate(key).then(data => {
      if (data) {
        data.download(localPackage => {
          this.installPackage(localPackage);
        }, error => {
          console.log('error');
        }, progress => {
          console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`);
        });
      }
    }).catch(error => {

    });
  }

  installPackage(data: ILocalPackage) {
    data.install(() => {
      this.codePush.restartApplication();
      this.codePush.notifyApplicationReady();
    }, error => {
      console.log('install error');
    });
  }
}
