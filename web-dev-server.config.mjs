import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  open: 'demo',
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
};
