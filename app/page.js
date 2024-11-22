// "use client"
// import Link from 'next/link'
// import React, { useState } from 'react'

// const Home = () => {
//     const [url, seturl] = useState("")
//     const [shorturl, setshorturl] = useState("")
//     const [generated, setGenerated] = useState("")

//     const generate = () => {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({
//             "url": url,
//             "shorturl": shorturl
//         });

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         fetch("/api/generate", requestOptions)
//             .then((response) => response.json())
//             .then((result) => {
//                 setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
//                 seturl("")   
//                 setshorturl("")
//                 console.log(result)
//                 alert(result.message)
            
//             })
//             .catch((error) => console.error(error));
//     }


//     return (
//         <div className='mx-auto max-w-lg bg-red-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
//             <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
//             <div className='flex flex-col gap-2'>
//                 <input type="text"
//                     value={url}
//                     className='px-4 py-2 focus:outline-red-600 rounded-md'
//                     placeholder='Enter your URL'
//                     onChange={e => { seturl(e.target.value) }} />

//                 <input type="text"
//                     value={shorturl}
//                     className='px-4 py-2 focus:outline-red-600 rounded-md'
//                     placeholder='Enter your preferred short URL text'
//                     onChange={e => { setshorturl(e.target.value) }} />
//                 <button onClick={generate} className='bg-red-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white'>Generate</button>
//             </div>

//             {generated && <> <span className='font-bold text-lg'>Your Link </span><code><Link target="_blank" href={generated}>{generated}</Link> 
//                 </code></>}
//         </div>
//     )
// }

// export default Home



"use client";
import Link from "next/link";
import React, { useState } from "react";

const Home = () => {
    const [url, setUrl] = useState("");
    const [shorturl, setShortUrl] = useState("");
    const [generated, setGenerated] = useState("");

    const generate = () => {
        if (!url || !shorturl) {
            alert("Both URL and short URL fields are required.");
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, shorturl }),
        };

        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
                    setUrl("");
                    setShortUrl("");
                    alert(result.message || "URL generated successfully!");
                } else {
                    alert(result.error || "An error occurred while generating the URL.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="mx-auto max-w-lg bg-red-100 my-16 p-8 rounded-lg flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Generate your short URLs</h1>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={url}
                    className="px-4 py-2 focus:outline-red-600 rounded-md"
                    placeholder="Enter your URL"
                    onChange={(e) => setUrl(e.target.value)}
                />
                <input
                    type="text"
                    value={shorturl}
                    className="px-4 py-2 focus:outline-red-600 rounded-md"
                    placeholder="Enter your preferred short URL text"
                    onChange={(e) => setShortUrl(e.target.value)}
                />
                <button
                    onClick={generate}
                    className="bg-red-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
                >
                    Generate
                </button>
            </div>
            {generated && (
                <>
                    <span className="font-bold text-lg">Your Link: </span>
                    <code>
                        <Link target="_blank" href={generated}>
                            {generated}
                        </Link>
                    </code>
                </>
            )}
        </div>
    );
};

export default Home;
