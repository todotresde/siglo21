import { Line2Page } from './app.po';

describe('line2 App', function() {
  let page: Line2Page;

  beforeEach(() => {
    page = new Line2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
