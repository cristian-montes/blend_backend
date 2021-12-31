import { pool } from '../utils/pool';
import jwt from 'jsonwebtoken';

export class User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    connected_acct_id: string;

    constructor(public row:{id: string; name:string; email: string;  password_hash: string; connected_acct_id: string;}){
        this.id = row.id; 
        this.name = row.name;
        this.email = row.email;
        this.password_hash = row.password_hash;
        this.connected_acct_id = row.connected_acct_id;
    }


    static async InsertUser(user: { name:string; email:string; password_hash:string; connected_acct_id: string;}){
        const { rows } = await pool.query(
            `INSERT INTO users_active (name, email, password_hash, connected_acct_id) VALUES ($1, $2, $3, $4) RETURNING *`, [user.name, user.email, user.password_hash, user.connected_acct_id]
        )
        return new User(rows[0])
    }

    static async findByEmail(email: {email:string}){
        console.log('email', email.email)
        const { rows } = await pool.query(
            // 'SELECT * FROM users_active'
            'SELECT * FROM users_active WHERE email=$1',[email.email]
        );
        console.log('rows', rows[0]);
        if (!rows[0]) throw new Error('No accounts registered under this email address');

        return new User(rows[0]);
    }



    static async findById(id:number) {
        const { rows } = await pool.query(
          'SELECT FROM users_active WHERE id=$1',
          [id]
        );
        if(!rows[0]) throw new Error(`No user with Connected Acct Id: ${id}`);

        return new User(rows[0]);
    }
     //-------------------------------------------------------------------------------------//
  
     authToken(){
        return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }
    //------------------------------------------------------------------------------------//
    toJSON(){
        return{
            id:this.id,
            name:this.name,
            email: this.email,
            password_hash: this.password_hash,
            connected_acct_id: this.connected_acct_id
        };
    }
    //--


}