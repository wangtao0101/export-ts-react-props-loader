import compiler from './compiler.js';

describe('basic test', () => {
  test('basic loader', async () => {
    const stats = await compiler('./fixtures/reactComponent.tsx');
    expect(stats.toJson().modules[6].source).toMatchSnapshot();
  });

  test('configFile option', async () => {
    const stats = await compiler('./fixtures/reactComponent.tsx', {
      loaderOptions: { configFile: 'tsconfig_test.json' }
    });
    expect(stats.toJson().modules[6].source).toMatchSnapshot();
  });
});
