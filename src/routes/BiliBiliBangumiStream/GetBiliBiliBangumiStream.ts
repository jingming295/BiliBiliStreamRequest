import { BiliBiliBangumiStreamRequest, BiliBiliRequest, bangumiStream } from "../../interfaces/BilibiliStreamInterface";

export class GetBiliBiliBangumiStream
{
    async performAction(data: BiliBiliBangumiStreamRequest)
    {
        try
        {
            return await this.getBangumiStream(data);
        } catch (error)
        {
            return { code: -101, message: (error as Error).message };
        }
    }

    public async getBangumiStream(data: BiliBiliBangumiStreamRequest)
    {
        const url = 'https://api.bilibili.com/pgc/player/web/playurl';
        const params = new URLSearchParams({
            ep_id: data.ep_id.toString(),
            qn: data.qn.toString(),
            fnval: '1',
            fourk: '1',
            fnver: '0',
        });

        const headers = this.returnBilibiliHeaders(data.sessdata);

        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: headers,
            credentials: 'include' // 这里模拟了 'credentials: 'include'' 的效果
        });

        if (response.ok)
        {
            const responseData = await response.json() as bangumiStream;
            console.log(responseData);
            if (responseData.code === 0)
            {
                return responseData;
            } else
            {
                throw new Error(responseData.message);
            }
        } else
        {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

    }

    private returnBilibiliHeaders(biliBiliSessData: string)
    {
        const headers = {
            Cookie: `SESSDATA=${biliBiliSessData};`,  // 你的SESSDATA
            referer: 'https://www.bilibili.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        };
        return headers;
    }
}