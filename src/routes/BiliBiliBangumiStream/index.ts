// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetBiliBiliBangumiStream } from './GetBiliBiliBangumiStream';
import { BiliBiliBangumiStreamRequest } from '../../interfaces/BilibiliStreamInterface';

const router = express.Router();

router.post('/GetBiliBiliBangumiStream', async (req: Request, res: Response) =>
{
  try
  {
    const getBiliBiliBangumiStream = new GetBiliBiliBangumiStream();
    const body = req.body as BiliBiliBangumiStreamRequest;
    if(!body.ep_id || !body.qn || !body.sessdata){
      res.json({ code: -101, message: 'Data not complete' });
      return;
    }
    const userResult = await getBiliBiliBangumiStream.performAction(body);
    res.json(userResult);
  } catch (error)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

});
export default router;



