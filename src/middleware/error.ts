import {Request, Response, NextFunction } from "express";

const error = (err:any, req:Request, res:Response, next: NextFunction) => {
    const status = err.status || 500;
  
    res.status(status);
  
    console.log(err);
  
    res.send({
      status,
      message: err.message,
    });
  };
  

  export default error;