import { pool } from '../utils/pool';

export class User {
    id: string;
    name: string;
    email: string;
    password_hash: string;

    constructor(public row:{id: string; name:string; email: string;  password_hash: string;}){
        this.id = row.id; 
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

    static async findByEmail(email:string){
        const { rows } = await pool.query(
            `SELECT * FROM users_active WHERE email=$1`, [email]
        );
        if (!rows[0]) throw new Error('No accounts registered under this email address');

        return new User(rows[0]);

    }





}