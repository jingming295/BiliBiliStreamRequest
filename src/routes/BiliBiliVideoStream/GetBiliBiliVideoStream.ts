import { BVideoStream, BiliBiliRequest } from "../../interfaces/BilibiliStreamInterface";

export class GetBiliBiliVideoStream
{
    async performAction(data:BiliBiliRequest)
    {
        try {
            return await this.getBilibiliVideoStream(data);
        } catch (error) {
            return { code: -101, message: 'Error' };
        }
    }

    public async getBilibiliVideoStream(data: BiliBiliRequest)
    {
        const url = 'https://api.bilibili.com/x/player/wbi/playurl';
        const params = new URLSearchParams({
            bvid: data.bvid,
            avid: data.avid,
            cid: data.cid,
            qn: data.qn.toString(),
            fnval: (1 | 128).toString(),
            fourk: '1',
            platform: data.platform,
            high_quality: '1'
        });
        const headers = this.returnBilibiliHeaders(data.sessdata);
        const response = await fetch(`${url}?${params.toString()}`, {
            headers: headers,
            credentials: 'include' // 这里模拟了 'credentials: 'include'' 的效果
        });

        if (response.ok)
        {
            const data: BVideoStream = await response.json();
            if (data.code === 0)
            {
                return data;
            } else
            {
                console.error('Error:', data.message);
                throw new Error(`Error: ${data.message}`);
            }
        } else
        {
            console.error('Error:', response.status);
            throw new Error(`Error: ${response.status}`);
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