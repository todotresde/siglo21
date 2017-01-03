import { Component } from '@angular/core';

@Component({
	moduleId: "shared",
	selector: 'sidebar-cmp',
	templateUrl: './sidebar.html'
})

export class SidebarComponent {
	isActive = false;
	showMenu: string = '';
	eventCalled() {
		this.isActive = !this.isActive;
	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
