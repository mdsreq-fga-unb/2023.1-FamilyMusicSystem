import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContractComponent } from '../../modules/settings/contract/contract.component';
import { PrivacyComponent } from '../../modules/settings/privacy/privacy.component';
import { ResourcesComponent } from '../../modules/settings/resources/resources.component';
import { AboutComponent } from '../../modules/settings/about/about.component';
import { HelpComponent } from '../../modules/settings/help/help.component';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Component, HostListener, OnInit } from '@angular/core';
import { StudentsViewComponent } from '../../modules/student/students-view/students-view.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class HeaderComponent implements OnInit {
  icon = ['brightness_2', 'wb_sunny'];
  icon_now = 'brightness_2';
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  modalhelp() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(HelpComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }
  modalprofile() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      StudentsViewComponent,
      modalConfig
    );
    this.bsModalRef.content.onClose.subscribe(() => {});
  }

  modalcontract() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ContractComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }
  modalprivacy() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(PrivacyComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }
  modalresources() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ResourcesComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }
  modalabout() {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: false,
      initialState: {},
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(AboutComponent, modalConfig);
    this.bsModalRef.content.onClose.subscribe(() => {});
  }

  toggle() {
    const theme = document.body.classList.toggle('darkTheme');

    if (theme) {
      return (this.icon_now = this.icon[1]);
    }
    return (this.icon_now = this.icon[0]);
  }

  screenSize: number;
  iscomp = true;

  @HostListener('window:resize', [])
  onResize() {
    const screenWidth = window.innerWidth;
    this.screenSize = screenWidth;
    if (this.screenSize >= 1035) {
      this.iscomp = true;
    } else {
      this.iscomp = false;
    }
  }

  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.screenSize = screenWidth;
    if (this.screenSize >= 1035) {
      this.iscomp = true;
    } else {
      this.iscomp = false;
    }
  }
}
