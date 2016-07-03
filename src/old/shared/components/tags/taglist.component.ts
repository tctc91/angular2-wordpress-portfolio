import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {TagService} from '../../services/tag.service';
import {EventStore} from '../../misc/eventStore';

@Component({
  selector: 'app-tags',
  viewProviders: [EventStore, HTTP_PROVIDERS],
  moduleId: module.id,
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class TagListComponent {
	tagList: any;

	constructor(private _tagService: TagService, private _router: Router, private _location: Location) {
		this.tagList = <any> false;

		this._tagService.fetchTagsCollection().subscribe(() => {
			this.tagList = this._tagService.tags;
		});
	}

  loadTag(slug: string) {
    this._router.navigate(['Tag', { slug: slug }]);
  }
}