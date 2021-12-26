import { pool } from '../utils/pool';

export class User {
    name: string;
    email: string;
    password_hash: string;

    constructor(public row:{ name:string; email: string;  password_hash: string;}){
        this.name = row.name;
        this.email = row.email;
        this.password_hash = row.password_hash;
    }


    static async InsertUser(user: { name:string; email:string; password_hash:string;}){
        const { rows } = await pool.query(
            `INSERT INTO users_active (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password_hash]
        )
        return new User(rows[0])
    }

}