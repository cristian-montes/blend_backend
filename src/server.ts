import { app } from './app';
import { pool } from './utils/pool';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 7890 

app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
    // console.log('salt_rounds is', typeof(+process.env.SALT_ROUNDS));
    process.on('exit', ()=>{
        console.log('Goodbye!');
        pool.end();
    })
});
