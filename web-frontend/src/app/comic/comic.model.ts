export class Comic {
  id: number;
  filename: string;
  publisher: string;
  series: string;
  volume: string;
  issue_number: string;
  title: string;
  description: string;
  notes: string;
  summary: string;
  missing: boolean;
  archive_type: string;
  comic_vine_id: string;
  added_date: string;
  cover_date: string;
  last_read_date: string;
  page_count: number;

  constructor(
    id: number,
    filename: string,
    publisher: string,
    series: string,
    volume: string,
    issue_number: string,
    title: string,
    description: string,
    notes: string,
    summary: string,
    missing: boolean,
    archive_type: string,
    comic_vine_id: string,
    added_date: string,
    cover_date: string,
    last_read_date: string,
    page_count: number,
  ) {
    this.id = id;
    this.filename = filename;
    this.publisher = publisher;
    this.series = series;
    this.volume = volume;
    this.issue_number = issue_number;
    this.title = title;
    this.description = description;
    this.notes = notes;
    this.summary = summary;
    this.missing = missing;
    this.archive_type = archive_type;
    this.comic_vine_id = comic_vine_id;
    this.added_date = added_date;
    this.cover_date = cover_date;
    this.last_read_date = last_read_date;
    this.page_count = page_count;
  }
}