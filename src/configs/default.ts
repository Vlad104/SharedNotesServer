export default () => ({
  originUrl: process.env.ORIGIN_URL || 'http://localhost:3000',
  database: {
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.PG_PW || 'pg_pass',
    database: process.env.PG_DB || 'pg_notes',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
