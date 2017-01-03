import { Component } from '@angular/core';

import { DropdownConfig } from 'ng2-bootstrap/dropdown';

@Component({
    moduleId: "shared",
    selector: 'top-nav',
    templateUrl: './topnav.html',
    providers: [DropdownConfig]
})

export class TopNavComponent {
	changeTheme(color: string): void {
		/*
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
			*/
	}

	rtl(): void {
		/*
		var body: any = $('body');
		body.toggleClass('rtl');
		*/
	}

	sidebarToggler(): void  {
		/*
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
		*/
	}
}
