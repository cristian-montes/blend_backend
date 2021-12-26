import fs from 'fs/promises';

export = (pool: any) => {
    return fs
        .readFile('sql/setup.sql', { encoding: 'utf-8' })
        .then((sql) => pool.query(sql));
};