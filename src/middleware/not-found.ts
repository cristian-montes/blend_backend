import {Request, Response, NextFunction } from "express";

const notFound = (req:Request, res:Response, next: NextFunction) => {
    const err = new Error('Not Found');
    next(err);
  };

export default notFound