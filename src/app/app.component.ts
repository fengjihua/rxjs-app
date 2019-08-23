import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'async-app';

  minute = 0;

  ngOnInit(): void {
    // *0
    console.log('[5分钟GET H5] - 被玩坏了的异步处理 RxJS');
    // 煮蛋器
    const eggMachine: Observable<any> = Observable.create((xiaoMing: Observer<any>) => {
      console.log('8点' + this.minute + '分 煮鸡蛋');
      this.minute += 8;
      xiaoMing.next('8点' + this.minute + '分 [鸡蛋完成]');
    });

    // 面包机
    const toastMachine: Observable<any> = Observable.create((xiaoMing: Observer<any>) => {
      console.log('8点' + this.minute + '分 烤面包');
      this.minute += 6;
      xiaoMing.next('8点' + this.minute + '分 [面包完成]');
    });

    // 咖啡机
    const cafeMachine: Observable<any> = Observable.create((xiaoMing: Observer<any>) => {
      console.log('8点' + this.minute + '分 煮咖啡');
      this.minute += 2;
      xiaoMing.next('8点' + this.minute + '分 [咖啡完成]');
    });

    // 同步
    console.log('[5分钟GET H5] - 同步的第一天：');
    this.minute = 0;
    eggMachine.subscribe((message: Observer<any>) => {
      console.log(message);

      cafeMachine.subscribe((message: Observer<any>) => {
        console.log(message);

        toastMachine.subscribe((message: Observer<any>) => {
          console.log(message);
        });
      });
    });

    // 异步
    console.log('[5分钟GET H5] - 异步的第二天：');
    this.minute = 0;
    eggMachine.subscribe((message: Observer<any>) => {
      console.log(message);
    });

    this.minute = 0;
    cafeMachine.subscribe((message: Observer<any>) => {
      console.log(message);
    });

    this.minute = 0;
    toastMachine.subscribe((message: Observer<any>) => {
      console.log(message);
    });
  }
}
