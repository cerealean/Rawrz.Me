import { RawrzMePage } from './app.po';

describe('rawrz-me App', () => {
  let page: RawrzMePage;

  beforeEach(() => {
    page = new RawrzMePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
