import data from './prod_data.json' with { type: "json" };
import { finished } from 'stream/promises';
import { Readable } from 'stream';
import { writeFile } from "fs/promises";

for (const p of data) {
    let res302 = await fetch(p.photoLink, {
        "headers": {
          "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "accept-language": "en-US,en",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "priority": "i",
          "sec-fetch-dest": "image",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
          "Referer": "http://localhost:5173/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
    
    let res = await fetch(res302.url, {
        "headers": {
          "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "accept-language": "en-US,en",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "priority": "i",
          "sec-fetch-dest": "image",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
          "Referer": "http://localhost:5173/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
    console.log(res)
    
      const array = await res.arrayBuffer();
    await writeFile(`assets/${p.id}.png`, Buffer.from(array));

    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    // await delay(5000)
}



