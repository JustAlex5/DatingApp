import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewCompiler} from "@angular/compiler";
import {AccountService} from "../_services/account.service";
import {User} from "../_models/users";
import { take } from 'rxjs/operators';
import { Input } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      if (!user) {
        this.viewContainerRef.clear();
        return;
      } else {
        // @ts-ignore
        if (this.appHasRole.some( r=> user?.roles.includes(r))) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    })

  }

}
