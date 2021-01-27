// ------------------------------------------------------------------------------
// name: string.spec
// author: mudas( mschool.tech )
// created: 2019/11/4 17:42
// ------------------------------------------------------------------------------

import { repeat, trim } from '@mudas/easy-store';

describe('string test:', () => {
  // repeat
  it('string.repeat...', () => {
    expect(repeat('a', 5)).toBe('aaaaa');
  });

  // trim
  it('string.trim...', () => {
    expect(trim('   a bc  ')).toBe('a bc');
  });
});
