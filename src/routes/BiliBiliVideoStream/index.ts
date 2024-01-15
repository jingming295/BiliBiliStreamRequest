// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetBiliBiliVideoStream } from './GetBiliBiliVideoStream';
import { BiliBiliRequest } from '../../interfaces/BilibiliStreamInterface';

const router = express.Router();

router.post('/GetBiliBiliVideoStream', async (req: Request, res: Response) =>
{
  try
  {
    const getBiliBiliVideoStream = new GetBiliBiliVideoStream();
    const body = req.body as BiliBiliRequest;
    if(!body.avid || !body.bvid || !body.cid || !body.sessdata || !body.platform || !body.qn){
      res.json({ code: -101, message: 'Data not complete' });
      return;
    }
    const userResult = await getBiliBiliVideoStream.performAction(body);
    res.json(userResult);
  } catch (error)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

});
export default router;
