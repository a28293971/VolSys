import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { EventBusService } from '../../common/services/event-bus.service';
import { CommonModule } from '@angular/common';

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
            isOpen: false,
            icon: 'fa-heart',
            children: [
                { name: "活动列表", icon: 'fa-list', route: 'act' },
                { name: "活动审批", icon: 'fa-check-square', route: 'apr' }
            ]
        }
    ];

    public isCollapse: boolean = false;

    constructor(
        private elementRef: ElementRef,
        private eventBusService: EventBusService
    ) {}

    ngOnInit() {
        this.eventBusService.topToggleBtn.subscribe(value => {
            this.toggleMenuAll(value);
        });
    }

    private toggleMenuAll(isCollapse: boolean): void {
        this.isCollapse = isCollapse;
        this.menus.forEach(item => {
            item.isOpen = false;
        });
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

    @HostListener('body:click', ['$event'])
    public onBodyClick(event): void {
        if (this.isCollapse && (event.clientX > 75)) {
            this.menus.forEach(item => {
                item.isOpen = false;
            });
        }
    }
}

