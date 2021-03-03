const { cmp } = require('..');
const { strictEqual } = require('assert');

strictEqual(cmp('0', '0'), 0);
strictEqual(cmp('-0', '0'), 0);
strictEqual(cmp('0', '-0'), 0);
strictEqual(cmp('-0', '-0'), 0);
strictEqual(cmp('1', '1'), 0);
strictEqual(cmp('-1', '1'), -1);
strictEqual(cmp('1', '-1'), 1);
strictEqual(cmp('-1', '-1'), 0);
strictEqual(cmp('123', '123'), 0);
strictEqual(cmp('-123', '123'), -1);
strictEqual(cmp('123', '-123'), 1);
strictEqual(cmp('-123', '-123'), 0);

strictEqual(cmp('5e-324', '0'), 1);
strictEqual(cmp('0', '5e-324'), -1);

strictEqual(cmp('1', '2'), -1);
strictEqual(cmp('-1', '2'), -1);
strictEqual(cmp('1', '-2'), 1);
strictEqual(cmp('-1', '-2'), 1);
strictEqual(cmp('2', '1'), 1);
strictEqual(cmp('-2', '1'), -1);
strictEqual(cmp('2', '-1'), 1);
strictEqual(cmp('-2', '-1'), -1);

strictEqual(cmp(Number.MAX_VALUE.toString(), Number.MAX_VALUE.toString()), 0);
strictEqual(cmp(Number.MIN_VALUE.toString(), Number.MIN_VALUE.toString()), 0);
strictEqual(cmp(Number.MAX_VALUE.toString(), Number.MIN_VALUE.toString()), 1);
strictEqual(cmp(Number.MIN_VALUE.toString(), Number.MAX_VALUE.toString()), -1);

strictEqual(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628'), 0);
strictEqual(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998627'), 1);
strictEqual(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998629'), -1);

strictEqual(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628'), 0);
strictEqual(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '2.141592653589793238462643383279502884197169399375105820974944592307816406286208998628'), 1);
strictEqual(cmp('4.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '5.141592653589793238462643383279502884197169399375105820974944592307816406286208998628'), -1);
