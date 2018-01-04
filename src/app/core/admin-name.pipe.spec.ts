import { AdminNamePipe } from './admin-name.pipe';

describe('AdminNamePipe', () => {
  it('create an instance', () => {
    const pipe = new AdminNamePipe();
    expect(pipe).toBeTruthy();
  });
});
