/** Audio and listening exercises: no credentials or network dependencies. */
export const TTS_VOICES=['marin','cedar','alloy','nova'] as const;
export type TTSVoice=typeof TTS_VOICES[number];
export type AudioRequest={text:string;voice:TTSVoice};
export function parseAudioRequest(value:unknown):AudioRequest|null {
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>;
 if(typeof body.text!=='string'||typeof body.voice!=='string')return null;
 const text=body.text.trim();
 if(text.length<1||text.length>1600||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text))return null;
 if(!TTS_VOICES.includes(body.voice as TTSVoice))return null;
 // English-focused only: the text must contain Latin letters.
 if(!/[A-Za-z]/.test(text))return null;
 return {text,voice:body.voice as TTSVoice};
}
export function spokenLine(line:string){return line.replace(/^[^:]{1,35}:\s*/, '').trim();}
export function listeningTokens(value:string):string[]{
 return value.toLowerCase().replace(/[‘’]/g,"'").replace(/[^a-z0-9'\s-]/g,' ').replace(/-/g,' ').split(/\s+/).filter(Boolean);
}
/** Word-accuracy, not a pronunciation assessment. Uses an order-sensitive edit distance. */
export function compareTranscription(expected:string,heard:string){
 const a=listeningTokens(expected),b=listeningTokens(heard);
 const dp=Array.from({length:a.length+1},()=>Array<number>(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)dp[i][0]=i;
 for(let j=0;j<=b.length;j++)dp[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
  dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
 }
 const errors=dp[a.length][b.length];
 return {expectedWords:a.length,heardWords:b.length,errors,accuracy:a.length?Math.round(Math.max(0,1-errors/a.length)*100):0};
}
