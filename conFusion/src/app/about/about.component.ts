import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leaderErrorMsg: any;
  constructor( private leaderService: LeaderService,
                        @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    // this.leaders = this.leaderService.getLeaders();
    
    //Promise
    // this.leaderService.getLeaders()
    //   .then(leaders => this.leaders = leaders);
    
    // //Observable
    // this.leaderService.getLeaders()
    //   .subscribe(leaders => this.leaders = leaders);
    
    //HTTP Client
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        leaderErrorMsg => this.leaderErrorMsg = leaderErrorMsg);
  }

}
