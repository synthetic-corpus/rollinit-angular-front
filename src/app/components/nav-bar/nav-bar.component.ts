import { Component, Inject, OnInit } from '@angular/core';
import { faDungeon, faQuestionCircle, faHeart} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AccountHttpService } from 'src/app/services/http/account-http.service';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  npcs = faDungeon;
  help = faQuestionCircle
  support = faHeart
  userName: string = '';
  userReady: Boolean = false
  myCampaign: string;


  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private userService: AccountHttpService,
    private campaignService: CampaignService
  ) {
    this.myCampaign = '';
  }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        this.userName = profile?.given_name + " " + profile?.family_name || "New User"

      }
    );
    this.userService.retrieveSelf()
      .subscribe(
        (res: Response) => {
          console.log("User exists in Database")
          this.userReady = true
        },
        (error: Error)=>{
          console.log("Adding user to Database")
          this.addSelf()
        }
      )
      console.log(this.userReady)
    this.campaignService.readyCampaign()
    this.campaignService.campaignAdded
      .subscribe(
        (event)=>{this.myCampaign = event.name || 'my Campaign'}
      )
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
    this.auth.user$.subscribe(
      (profile: any) => this.userName = profile?.given_name + " " + profile?.family_name || "New User"
    )
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  addSelf(){
    this.userService.createUser({name: this.userName})
      .subscribe(
        (res) =>{
          console.log(res)
          this.userReady = true
        }
      )
  }
}
