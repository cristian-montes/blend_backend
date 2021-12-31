import {Request, Response, NextFunction } from "express";

module.exports = (req:Request, res:Response, next: NextFunction) => {
    const err = new Error('Not Found');
    // err.status = 404;
    next(err);
  };