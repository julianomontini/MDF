import { MdfPage } from './app.po';

describe('mdf App', function() {
  let page: MdfPage;

  beforeEach(() => {
    page = new MdfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
