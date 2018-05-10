import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { EventBusService } from '../../common/services/event-bus.service';
import { CommonModule } from '@angular/common';
import { CurrentUser } from '../../common/services/currentUser.data';
import { User } from '../../models/user-model';

@Component({
    selector: 'app-side-menu',
    templateUrl: './app-side-menu.component.html',
    styleUrls: ['./app-side-menu.component.scss']
})
export class AppSideMenuComponent implements OnInit {
    public menus = [
        {
            id: "1",
            name: "志愿系统",
            isOpen: true,
            icon: 'fa-heart',
            children: [
                { name: "活动列表", icon: 'fa-list', route: 'act/activities' }
            ]
        }
    ];

    public isCollapse: boolean = false;
    public currentUser: User;

    constructor(
        // private elementRef: ElementRef,
        private eventBusService: EventBusService,
        private CUser: CurrentUser
    ) { }

    ngOnInit() {
        this.currentUser = this.CUser.user;
        this.eventBusService.topToggleBtn.subscribe(value => {
            this.toggleMenuAll(value);
        });
        if (this.currentUser.isAdmin) {
            this.menus[0].children.push({ name: "活动创建", icon: 'fa-podcast', route: 'act/createact' });
            this.menus[0].children.push({ name: "活动审批", icon: 'fa-check-square', route: 'apr/list' });
        }else {
            this.menus[0].children.push({ name: "活动自主申请", icon: 'fa-plus-circle', route: 'act/apllyact' });
        }

/*         this.menus[0].children.push({ name: "活动创建", icon: 'fa-podcast', route: 'act/createact' });
        this.menus[0].children.push({ name: "活动审批", icon: 'fa-check-square', route: 'apr/list' }); */
        /* this.menus[0].children.unshift({ name: "活动自主申请", icon: 'fa-plus-circle', route: 'act/apllyact' }); */
    }

    private toggleMenuAll(isCollapse: boolean): void {
        this.isCollapse = isCollapse;
        if (this.isCollapse && (document.body.clientWidth > 768)) {
            this.menus.forEach(item => {
                item.isOpen = false;
            });
        }
    }

    public toggleMenuItem(event, menu): void {
        menu.isOpen = !menu.isOpen;
        // 折叠状态下只能打开一个二级菜单层
        if (this.isCollapse) {
            const tempId = menu.id;
            this.menus.forEach(item => {
                if (item.id !== tempId) {
                    item.isOpen = false;
                }
            });
        }
    }

    public mobileClick() {
        if (document.body.clientWidth <= 768) {
            this.eventBusService.topToggleBtn.next(true);
        }
    }

    @HostListener('body:click', ['$event'])
    public onBodyClick(event): void {
        // console.log('click!----X' + event.clientX);
        // console.log('click!----Y' + event.clientY);
        // console.log(this.isCollapse);
        // if (this.isCollapse && (event.clientX > 75)) {
        //     this.menus.forEach(item => {
        //         item.isOpen = false;
        //     });
        // }
        if (!this.isCollapse && (document.body.clientWidth <= 768) && (event.clientY > 60) && (event.clientX > 220)) {
            // console.log(document.body.clientWidth);
            this.eventBusService.topToggleBtn.next(true);
        }
    }

}

