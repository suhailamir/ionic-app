import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import { WelcomePage } from "../welcome/welcome";


@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab5Root = WelcomePage;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;

  constructor() { }
}
