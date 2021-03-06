/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2018, The ComiXed Project
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { libraryReducer } from '../../../reducers/library.reducer';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ComicCoverUrlPipe } from '../../../pipes/comic-cover-url.pipe';
import { ComicFileCoverUrlPipe } from '../../../pipes/comic-file-cover-url.pipe';
import { ComicService } from '../../../services/comic.service';
import { ComicServiceMock } from '../../../services/comic.service.mock';
import { IMPORTING_STATE } from '../../../models/import/importing.fixtures';
import { READER_USER } from '../../../models/user/user.fixtures';
import { ImportPageComponent } from './import-page.component';
import { By } from '@angular/platform-browser';
import { ComicFileListComponent } from '../../components/import/comic-file-list/comic-file-list.component';
import { SelectedComicFileListComponent } from '../../components/import/selected-comic-file-list/selected-comic-file-list.component';
import { ComicFileListToolbarComponent } from '../../components/import/comic-file-list-toolbar/comic-file-list-toolbar.component';
import { ComicFile } from '../../../models/import/comic-file';
import { ComicFileGridItemComponent } from '../../components/import/comic-file-grid-item/comic-file-grid-item.component';
import { ComicCoverComponent } from '../../components/comic/comic-cover/comic-cover.component';
import {
  CheckboxModule,
  ConfirmationService,
  OverlayPanelModule,
  PanelModule,
  ScrollPanelModule,
  SidebarModule
} from 'primeng/primeng';
import { DEFAULT_LIBRARY_DISPLAY } from '../../../models/actions/library-display.fixtures';
import { EXISTING_LIBRARY } from '../../../models/actions/library.fixtures';
import { libraryDisplayReducer } from '../../../reducers/library-display.reducer';
import { importingReducer } from '../../../reducers/importing.reducer';
import { userReducer } from '../../../reducers/user.reducer';
import * as LibraryActions from '../../../actions/library.actions';
import * as DisplayActions from '../../../actions/library-display.actions';
import * as ImportActions from '../../../actions/importing.actions';
import * as UserActions from '../../../actions/user.actions';

const DIRECTORY_TO_USE = '/User/comixed/Downloads';

describe('ImportPageComponent', () => {
  let component: ImportPageComponent;
  let fixture: ComponentFixture<ImportPageComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({
          library: libraryReducer,
          library_display: libraryDisplayReducer,
          importing: importingReducer,
          user: userReducer
        }),
        DataViewModule,
        SliderModule,
        ButtonModule,
        DropdownModule,
        ProgressBarModule,
        CardModule,
        SplitButtonModule,
        ToolbarModule,
        CheckboxModule,
        SidebarModule,
        ScrollPanelModule,
        OverlayPanelModule,
        PanelModule
      ],
      declarations: [
        ImportPageComponent,
        ComicFileListComponent,
        ComicFileGridItemComponent,
        ComicFileListToolbarComponent,
        SelectedComicFileListComponent,
        ComicCoverComponent,
        ComicCoverUrlPipe,
        ComicFileCoverUrlPipe
      ],
      providers: [
        ConfirmationService,
        { provide: ComicService, useClass: ComicServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    store.dispatch(new LibraryActions.LibraryReset());
    store.dispatch(new UserActions.UserLoaded({ user: READER_USER }));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when not importing comics', () => {
    beforeEach(() => {
      store.dispatch(new LibraryActions.LibraryMergeNewComics({
        library_state: {
          import_count: 0,
          rescan_count: 0,
          comics: []
        }
      }));
      fixture.detectChanges();
    });

    it('uses the previous directory value', () => {
      store.dispatch(new ImportActions.ImportingSetDirectory({ directory: DIRECTORY_TO_USE }));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('#directory-input')).nativeElement.value).toEqual(DIRECTORY_TO_USE);
      });
    });

    it('does not show the progress indicator', () => {
      expect(fixture.debugElement.query(By.css('#import-busy-indicator-container'))).toBeFalsy();
    });

    it('shows the comic file view', () => {
      expect(fixture.debugElement.query(By.css('#comic-file-list-container'))).toBeTruthy();
    });
  });

  describe('when importing comics', () => {
    beforeEach(() => {
      store.dispatch(new LibraryActions.LibraryMergeNewComics({
        library_state: {
          import_count: 1,
          rescan_count: 0,
          comics: []
        }
      }));
      fixture.detectChanges();
    });

    it('does not show the comic file view', () => {
      expect(fixture.debugElement.query(By.css('#comic-file-list-container'))).toBeFalsy();
    });

    it('shows the progress indicator', () => {
      expect(fixture.debugElement.query(By.css('#import-busy-indicator-container'))).toBeTruthy();
    });
  });
});
