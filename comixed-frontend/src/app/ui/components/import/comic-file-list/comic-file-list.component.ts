/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

import { Component, Input, OnInit } from '@angular/core';
import { ComicFile } from '../../../../models/import/comic-file';
import { LibraryDisplay } from '../../../../models/actions/library-display';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';

@Component({
  selector: 'app-comic-file-list',
  templateUrl: './comic-file-list.component.html',
  styleUrls: ['./comic-file-list.component.css']
})
export class ComicFileListComponent implements OnInit {
  @Input() comic_files: Array<ComicFile>;
  @Input() selected_comic_files: Array<ComicFile>;
  @Input() busy: boolean;
  @Input() library_display: LibraryDisplay;
  @Input() directory: string;

  show_selections = false;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {}
}
