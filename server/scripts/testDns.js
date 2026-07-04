import dns from 'dns';

const host = '_mongodb._tcp.cluster0.std5nio.mongodb.net';

dns.resolveSrv(host, (err, addresses) => {
  if (err) {
    console.error('resolveSrv error:', err);
    process.exit(1);
  }
  console.log('SRV records:', addresses);
});

dns.resolve4('cluster0.std5nio.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('resolve4 error:', err);
    process.exit(1);
  }
  console.log('A records:', addresses);
});
