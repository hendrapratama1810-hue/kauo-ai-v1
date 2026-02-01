// api/generate.js
import fetch from "node-fetch";

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  try{
    const { prompt } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // set di GitHub secrets atau Vercel
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5:generateText?key=${API_KEY}`,
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          prompt:{ text: prompt },
          temperature:0.7,
          candidate_count:1
        })
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.[0]?.text || "AI tidak merespon.";
    res.status(200).json({ reply });

  }catch(err){
    console.error(err);
    res.status(500).json({ reply:"Terjadi kesalahan server." });
  }
}